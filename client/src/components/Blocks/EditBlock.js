import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../config/options'

import Dropzone from "react-dropzone-uploader";
import { BsUpload } from "react-icons/bs";

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import ShowVariants from './ShowVariants'

const IMAGE_PREFIX = 'page-image'

export default ({pageId, blockData, setPassEditProps, refresh, setRefresh}) => {
    const [description, setDescription] = useState(blockData.text)
    const [imageLink, setImageLink] = useState(blockData.imageLink)
    const [title, setTitle] = useState(blockData.title)
    const [variant, setVariant] = useState(blockData.variant)
    const [really, setReally] = useState(false)

    ClassicEditor.defaultConfig = editorConfig

    const getImage = (image) => {
        try {
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
        axios.post(`http://localhost:5000/blocks/edit-block/${blockData._id}`, {pageId, text: description, title, imageLink, variant})
            .then(res => {
                setPassEditProps('')
                setRefresh(!refresh)
            })
            .catch(err => alert('Nepodarilo sa pridat blok, chyba: ', err))
    }

    const deleteBlock = () => {
        const blockId = blockData._id
        axios.delete(`http://localhost:5000/blocks/${blockId}`)
            .then(res => {
                axios.post(`http://localhost:5000/page/${pageId}/remove-block/`, {blockId})
                    .then(blockRes => {
                        setReally(false)
                        setPassEditProps('')
                        setRefresh(!refresh)
                    })
                    .catch(blockErr => console.log(blockErr))
            })
            .catch(err => alert('Chyba pri vymazavani bloku, ',err))
    }

    console.log(description)

    return (
        <Modal enforceFocus={false} size="lg" show={typeof blockData === 'object'} onHide={() => setPassEditProps('')}>
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
                <SlideDown className={"my-dropdown-slidedown"}>
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
            <div className="text-right">
                {really ? 
                <Button variant="danger" onClick={() => deleteBlock()}>
                    VYMAZAT!
                </Button>
                : <Button variant="danger" onClick={() => setReally(true)}>
                    Vymazat Blok?
                </Button>}
            </div>
            {((variant === 'para-para' && description) || (variant === 'img-only' && imageLink) || (description && imageLink))?
                <Button variant="dark" onClick={() => handleSave()}>
                    Upravit
                </Button> :
                <Button disabled variant="dark">
                    Upravit
                </Button>
            }&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={() => setPassEditProps('')}>
                Zrusit
            </Button>
            </Modal.Body>
        </Modal>
    )
}