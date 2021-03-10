import React, {useState} from 'react'
import axios from 'axios'

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import Dropzone from "react-dropzone-uploader";
import { BsUpload } from "react-icons/bs";

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import ShowVariants from './ShowVariants'

const IMAGE_PREFIX = 'page-image'

export default ({addBlockPopup, setAddBlockPopup, pageId, refresh, setRefresh}) => {
    const [description, setDescription] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [title, setTitle] = useState('')
    const [variant, setVariant] = useState('')

    const getImage = (image) => {
        try {
            console.log(image)
          const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
          return img;
        } catch {
          return null;
        }
    };

    const deleteFile = (file) => {
        axios
          .get(`http://localhost:5000/deleteFile/${IMAGE_PREFIX}`, {
            params: file
          })
          .then(() => 
            {return}
          )
          .catch((err) => err && console.log(err));
    };

    const getUploadParams = ({ meta }) => {
        return { url: `http://localhost:5000/fileUpload/${IMAGE_PREFIX}` };
    };

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === "removed") {
        deleteFile(meta);
        }
        if (status === "done") {
        setImageLink(`${IMAGE_PREFIX}-${meta.name}`);
        }
    };

    const handleSave = () => {
        axios.post(`http://localhost:5000/blocks/add`, {pageId, text: description, title, imageLink, variant})
            .then(res => {
                const newBlock = res.data
                axios.post(`http://localhost:5000/page/${pageId}/update-blocks/`, {newBlock})
                    .then(blockRes => {
                        setAddBlockPopup(false)
                        document.location.reload()
                    })
                    .catch(blockErr => console.log(blockErr))
            })
            .catch(err => alert('Nepodarilo sa pridat blok, chyba: ', err))
    }

    return (
        <Modal size="lg" show={addBlockPopup} onHide={() => setAddBlockPopup(false)}>
            <Modal.Body className="text-center">
                <ShowVariants variant={variant} setVariant={setVariant} />
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="title">Nadpis:</label>
                    <input
                        value={title}
                        className="form-control text-center"
                        name="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="description">Text:</label>
                    <textarea
                        value={description}
                        className="form-control text-center"
                        name="description"
                        type="text"
                        style={{ resize: "none", minHeight: "350px" }}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </Col>
                </Row>
                <SlideDown className={"my-dropdown-slidedown"}>
                {imageLink ? 
                <Row className="justify-content-center text-center">
                    <Col className="form-group">
                    <img style={{height:'110px', width: '160px'}} src={getImage(imageLink) ? getImage(imageLink) : imageLink} />
                    <Button onClick={() => setImageLink('')} variant="dark" size="sm" >Vymazat obrazok</Button>
                    </Col>
                </Row> :
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
                                Pridat obrazok udalosti. <br />
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
            {((variant === 'para-para' && description) || (variant === 'img-only' && imageLink) || (description && imageLink))?
                <Button variant="dark" onClick={() => handleSave()}>
                    Pridat
                </Button> :
                <Button disabled variant="dark">
                    Pridat
                </Button>
            }&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={() => setAddBlockPopup(false)}>
                Zrusit
            </Button>
            </Modal.Body>
        </Modal>
    )
}