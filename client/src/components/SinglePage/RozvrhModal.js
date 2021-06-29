import React from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default ({showRozvrhPopup, setShowRozvrhPopup, rozvrhLink}) => {
    return (
        <Modal size="xl" show={showRozvrhPopup} onHide={() => setShowRozvrhPopup(false)}>
            <Modal.Body className="text-center" style={{fontSize: "90%", backgroundColor: 'whitesmoke'}}>
            <iframe className="meo-event-calendar" 
                    style={{
                        width: '100%', 
                        height: '80vh', 
                        border: '1px solid #ccc', 
                        borderRadius: '3px'
                    }} 
                    src={rozvrhLink}
                    width="300" 
                    height="150">
            </iframe>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="dark" onClick={() => setShowRozvrhPopup(false)}>
                    Zavrieť
                </Button>
            </Modal.Footer>
        </Modal>
    )
}