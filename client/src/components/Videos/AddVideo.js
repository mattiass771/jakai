import React, {useState} from 'react'
import axios from 'axios'

import {
    getImage,
    deleteFile,
    getUploadParams,
    IMAGE_PREFIX
} from '../../utils/getImage'

import Dropzone from "react-dropzone-uploader";
import { BsUpload } from "react-icons/bs";

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../config/options'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default ({addVideoPopup, setAddVideoPopup, kolekcia}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')
    const [price, setPrice] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [vidCollection, setVidCollection] = useState('')

    ClassicEditor.defaultConfig = editorConfig

    const handleSave = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/videos/add-video`, {name, description, url, price, imageLink, vidCollection: kolekcia})
            .then(res => {
                setAddVideoPopup(false)
                setName('')
                setDescription('')
                setUrl('')
                setPrice('')
                setImageLink('')
                setVidCollection('')
            })
            .catch(err => alert('Nepodarilo sa pridat video, chyba: ', err))
    }

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === "removed") {
            deleteFile(meta);
        }
        if (status === "done") {
            setImageLink(`${IMAGE_PREFIX}-${meta.name}`);
        } 
    };

    return (
        <Modal enforceFocus={false} size="lg" show={addVideoPopup} onHide={() => setAddVideoPopup(false)}>
            <Modal.Body className="text-center">
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="name">Nazov:</label>
                    <input
                        value={name}
                        className="form-control text-center"
                        name="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="url">Vimeo cislo:</label>
                    <input
                        value={url}
                        className="form-control text-center"
                        name="url"
                        type="text"
                        onChange={(e) => setUrl((e.target.value).replace(/[^0-9]/g, ''))}
                    />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                        <label htmlFor="price">Suma mesacne:</label>
                        <input
                            value={price}
                            placeholder='zadarmo'
                            className="form-control text-center"
                            name="price"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="description">Text:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setDescription(data)
                        }}
                    />
                    </Col>
                </Row>
                {imageLink ? 
                    <Row className="justify-content-center text-center">
                        <Col className="form-group">
                        <img style={{height:'110px', width: '160px'}} src={getImage(imageLink)} />
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
                                    Pridat obrazok videa. <br />
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
            <br />
            <Button onClick={() => handleSave()} variant="dark">
                Pridat
            </Button>
            <Button variant="dark" onClick={() => setAddVideoPopup(false)}>
                Zrusit
            </Button>
            </Modal.Body>
        </Modal>
    )
}