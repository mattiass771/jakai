import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import "react-datepicker/dist/react-datepicker.css";
import { Col, Row } from 'react-bootstrap'

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import Dropzone from "react-dropzone-uploader";
import { BsUpload } from "react-icons/bs";

export default ({servicePopup, setServicePopup, refresh, setRefresh}) => {
    const [name, setName] = useState('')
    const [idFromName, setIdFromName] = useState('')
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [imageLink, setImageLink] = useState('')

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

    const handleSave = () => {
        axios.post(`http://localhost:5000/services/add`, {name, link, description, imageLink})
            .then(res => {
                setRefresh(!refresh)
                setServicePopup(false)
            })
            .catch(err => err && err.data)
    }
    
    return (
        <Modal show={servicePopup} onHide={() => setServicePopup(false)}>
            <Modal.Body className="text-center">
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                        <label htmlFor="name">Nazov sluzby:</label>
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
                        <label htmlFor="link">Externy link sluzby:</label>
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
                                Pridat obrazok sluzby. <br /> (povinne)
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
            {(name && description && imageLink) ?
                <Button variant="dark" onClick={() => handleSave()}>
                    Pridat
                </Button> :
                <Button disabled variant="dark">
                    Pridat
                </Button>
            }&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={() => setServicePopup(false)}>
                Zrusit
            </Button>
            </Modal.Body>
        </Modal>
        )
}