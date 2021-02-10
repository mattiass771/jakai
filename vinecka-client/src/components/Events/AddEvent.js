import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Row } from 'react-bootstrap'

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import Dropzone from "react-dropzone-uploader";
import { BsUpload } from "react-icons/bs";

export default ({eventPopup, setEventPopup, refresh, setRefresh}) => {
    const [startDate, setStartDate] = useState(new Date());

    const [name, setName] = useState('')
    const [idFromName, setIdFromName] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [where, setWhere] = useState('')
    const [when, setWhen] = useState('')

    useEffect(() => {
        if (name) {
            const setNewId = name.replace(/\s/g, '-').toLowerCase()
            setIdFromName(setNewId)
        }
    }, [name])

    const deleteFile = (file) => {
        axios
          .get(`http://localhost:5000/deleteFile/${idFromName}`, {
            params: file
          })
          .then(() => 
            {return}
          )
          .catch((err) => err && console.log(err));
    };

    const getUploadParams = ({ meta }) => {
        return { url: `http://localhost:5000/fileUpload/${idFromName}` };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === "removed") {
        deleteFile(meta);
        }
        if (status === "done") {
        setImageLink(`${idFromName}-${meta.name}`);
        }
    };

    useEffect(() => {
        setWhen(moment(startDate).format('DD.MM.YYYY, HH:mm'))
    },[startDate])

    const handleSave = () => {
        axios.post(`http://localhost:5000/events/add`, {name, link, description, imageLink, where, when})
            .then(res => {
                setRefresh(!refresh)
                setEventPopup(false)
            })
            .catch(err => err && err.data)
    }
    
    return (
        <Modal show={eventPopup} onHide={() => setEventPopup(false)}>
            <Modal.Body className="text-center">
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                        <label htmlFor="name">Nazov udalosti:</label>
                        <input 
                            name="name"
                            className="form-control text-center"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="povinne"
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                        <label htmlFor="where">Miesto udalosti:</label>
                        <input 
                            name="where"
                            className="form-control text-center"
                            value={where}
                            onChange={(e) => setWhere(e.target.value)}
                            placeholder="volitelne"
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                        <label htmlFor="link">Externy link udalosti:</label>
                        <input 
                            name="link"
                            className="form-control text-center"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="volitelne"
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                        Cas a datum udalosti (povinne): <strong>{when}</strong>
                        <br /><br />
                        Vyber: <DatePicker showTimeSelect selected={startDate} onChange={date => setStartDate(date)} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        value={description}
                        className="form-control text-center"
                        name="description"
                        type="text"
                        style={{ resize: "none", minHeight: "200px" }}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="povinne"
                    />
                    </Col>
                </Row>
                <br />
                <SlideDown className={"my-dropdown-slidedown"}>
                {name &&
                <Row>
                    <Col>
                        <Dropzone
                            maxFiles={1}
                            multiple={false}
                            canCancel={false}
                            getUploadParams={getUploadParams}
                            onChangeStatus={handleChangeStatus}
                            accept="image/*"
                            inputContent={() => (
                                <p
                                className="text-center"
                                key="label"
                                style={{ marginTop: "15px", color: "#333333" }}
                                >
                                Pridat obrazok udalosti. <br /> (povinne)
                                <br />
                                <BsUpload />
                                </p>
                            )}
                            classNames={{
                                dropzone: "dropzoning"
                            }}
                        />
                    </Col>
                </Row>}
            </SlideDown>
            <br />
            {(name && description && imageLink && when) ?
                <Button variant="dark" onClick={() => handleSave()}>
                    Pridat
                </Button> :
                <Button disabled variant="dark">
                    Pridat
                </Button>
            }&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={() => setEventPopup(false)}>
                Zrusit
            </Button>
            </Modal.Body>
        </Modal>
        )
}