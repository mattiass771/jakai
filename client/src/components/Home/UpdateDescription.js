import React, {useState} from 'react'
import axios from 'axios'

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default ({descriptionsPopup, setDescriptionsPopup, forceRefresh, setForceRefresh, descriptionGeneral}) => {
    
    const {title: titleText, subTitle: subTitleText, description: descriptionsText} = descriptionGeneral

    const [description, setDescription] = useState(descriptionsText)
    const [subTitle, setSubTitle] = useState(subTitleText)
    const [title, setTitle] = useState(titleText)

    const handleSave = () => {
        axios.put(`http://localhost:5000/home/general-description`, { descriptionGeneral: description, titleGeneral: title, subTitleGeneral: subTitle })
            .then(res => {
                console.log(res.data)
                setForceRefresh(!forceRefresh)
                setDescriptionsPopup('')
            })
            .catch(err => err && err.data)
    }

    return (
        <Modal show={descriptionsPopup} onHide={() => setDescriptionsPopup(false)}>
            <Modal.Body className="text-center">
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="title">Nadpis:</label>
                    <input
                        value={title}
                        className="form-control text-center"
                        name="title"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="povinne"
                    />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="form-group text-center mt-1">
                    <label htmlFor="subTitle">Podnadpis:</label>
                    <input
                        value={subTitle}
                        className="form-control text-center"
                        name="subTitle"
                        type="text"
                        onChange={(e) => setSubTitle(e.target.value)}
                        placeholder="povinne"
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
                        style={{ resize: "none", minHeight: "400px" }}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="povinne"
                    />
                    </Col>
                </Row>
            <br />
            {description ?
                <Button variant="dark" onClick={() => handleSave()}>
                    Upravit
                </Button> :
                <Button disabled variant="dark">
                    Upravit
                </Button>
            }&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="dark" onClick={() => setDescriptionsPopup(false)}>
                Zrusit
            </Button>
            </Modal.Body>
        </Modal>
    )
}