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

export default ({passEditProps, setPassEditProps, vidCollections}) => {
    const [name, setName] = useState(passEditProps.name || '')
    const [description, setDescription] = useState(passEditProps.description || '')
    const [url, setUrl] = useState(passEditProps.url || '')
    const [price, setPrice] = useState(passEditProps.price || '')
    const [imageLink, setImageLink] = useState(passEditProps.imageLink || '')
    const [vidCollection, setVidCollection] = useState('')

    const videoId = passEditProps._id || null

    ClassicEditor.defaultConfig = editorConfig

    const handleSave = () => {
        if (videoId) {
            axios.post(`http://localhost:5000/videos/edit-video/${videoId}`, {name, description, url, price, imageLink})
                .then(res => setPassEditProps(''))
                .catch(err => alert('Nepodarilo sa upravit video, chyba: ', err))
        }
    }

    const deleteVideo = () => {
        if (videoId) {
            axios.post(`http://localhost:5000/videos/delete-video/${videoId}`)
                .then(res => setPassEditProps(''))
                .catch(err => alert('Nepodarilo sa vymazat video, chyba: ', err))
        }
    }

    const handleChangeStatus = ({ meta, file }, status) => {
        if (status === "removed") {
            deleteFile(meta);
        }
        if (status === "done") {
            setImageLink(`${IMAGE_PREFIX}-${meta.name}`);
        } 
    };

    const GetVidCollectionOptions = () => {
        return vidCollections.map(collection => {
            return (
                <option key={collection}>{collection}</option>
            )
        })
    }

    return (
        <Modal enforceFocus={false} size="lg" show={typeof passEditProps === 'object' && videoId !== null} onHide={() => setPassEditProps('')}>
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
                        <label htmlFor="vidCollections">Vyber Existujucej Kolekcie:</label>
                        <Form.Control 
                            as="select"
                            name="vidCollections"
                        >
                            <option></option>
                            <GetVidCollectionOptions />
                        </Form.Control>
                    </Col>
                    <Col className="form-group text-center mt-1">
                        <label htmlFor="newCollection">Kolekcia:</label>
                        <input
                            value={vidCollection}
                            placeholder='zadarmo'
                            className="form-control text-center"
                            name="newCollection"
                            type="text"
                            onChange={(e) => setVidCollection(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="description">Text:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={description}
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
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                        <Button onClick={() => deleteVideo()} variant="danger">
                            Vymazat
                        </Button>
                    </Col>
                </Row>
            <br />
            <Button onClick={() => handleSave()} variant="dark">
                Upravit
            </Button>
            <Button variant="dark" onClick={() => setPassEditProps('')}>
                Zrusit
            </Button>
            </Modal.Body>
        </Modal>
    )
}