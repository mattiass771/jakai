import React, {useState} from 'react'
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

export default ({addBlockPopup, setAddBlockPopup, pageId, refresh, setRefresh}) => {
    const [description, setDescription] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [title, setTitle] = useState('')
    const [variant, setVariant] = useState('')
    const [images, setImages] = useState([])

    ClassicEditor.defaultConfig = editorConfig

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
        if (status === "removed" && variant !== 'gallery') {
            deleteFile(meta);
        }
        if (status === "done" && variant !== 'gallery') {
            setImageLink(`${IMAGE_PREFIX}-${meta.name}`);
        } else if (status === "done" && variant === 'gallery') {
            setImages([...images, `${IMAGE_PREFIX}-${meta.name}`]);
        }
    };

    const handleSave = () => {
        axios.post(`http://localhost:5000/blocks/add`, {pageId, text: description, title, imageLink, variant, images})
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

    const showImages = () => {
        return images.map(image => {
            return (
                <Col md={3} key={image}>
                    <img style={{height:'110px', width: '160px'}} src={getImage(image)} />
                    <br />
                    <Button style={{marginTop: '-40px'}} onClick={() => setImages(images.filter(img => img !== image))} variant="dark" size="sm" >Vymazat obrazok</Button>
                </Col>
            )
        })
    }

    return (
        <Modal enforceFocus={false} size="lg" show={addBlockPopup} onHide={() => setAddBlockPopup(false)}>
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
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setDescription(data)
                        }}
                    />
                    </Col>
                </Row>
                <SlideDown className={"my-dropdown-slidedown"}>
                {variant !== 'gallery' &&
                    (imageLink ? 
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
                        </Row>)}
                {variant === 'gallery' &&
                <>
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
                                    Pridat obrazky do galerie udalosti. <br />
                                    <br />
                                    <BsUpload />
                                    </p>
                                )}
                                classNames={{
                                    dropzone: "dropzoning"
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-center text-center">
                        {showImages()}
                    </Row>
                </>
                }
            </SlideDown>
            <br />
            {((variant === 'para-para' && description) || (variant === 'img-only' && imageLink) || (variant === 'gallery' && images.length !== 0) || (description && imageLink))?
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