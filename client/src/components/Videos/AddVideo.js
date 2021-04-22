import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../config/options'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default ({addVideoPopup, setAddVideoPopup}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [url, setUrl] = useState('')

    ClassicEditor.defaultConfig = editorConfig

    const handleSave = () => {
        axios.post(`http://localhost:5000/videos/add-video`, {name, description, url})
            .then(res => setAddVideoPopup(false))
            .catch(err => alert('Nepodarilo sa pridat video, chyba: ', err))
    }

    useEffect(() => {
        console.log(url)
    }, [url])

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