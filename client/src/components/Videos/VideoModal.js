import React from 'react'

import { getImage } from '../../utils/getImage'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import {MdLock} from 'react-icons/md'

export default ({showVideoPopup, setShowVideoPopup }) => {
    const {_id, name, url, description, price, imageLink} = showVideoPopup
    return (
        <Modal size="xl" show={typeof showVideoPopup === 'object'} onHide={() => setShowVideoPopup('')}>
            <Modal.Body className="text-center" style={{fontSize: "90%", backgroundColor: 'whitesmoke'}}>
                <header style={{fontSize: '300%', fontWeight: '900'}}>{name}</header>
                {typeof price === 'number' && price > 0 ?
                <>
                    <figure 
                        style={{
                            width: '100%', 
                            background: `url(${getImage(imageLink)}) center center no-repeat`, 
                            cursor: 'pointer',
                            backgroundSize: 'cover',
                            WebkitBackgroundSize: 'cover',
                            MozBackgroundSize: 'cover'
                        }} 
                        className={`box-shad-card video-tresholds`} 
                    >
                        <figure 
                            className="whitesmoke-bg-pless"
                            style={{
                                width: '100%', 
                                height: '100%',  
                                position: 'relative',
                            }}
                        >
                            <MdLock
                                className={`vertical-center`}
                                style={{
                                    fontSize: '800%',
                                    opacity: '1.0'
                                }}
                            />
                        </figure>
                    </figure>
                    <article className="pt-4" style={{
                        fontSize: '175%',
                        fontWeight: '800',
                    }}>
                        <p>Toto video si môžete predplatiť.</p>
                        <p>Cena za mesiac: {price.toFixed(2).toString().replace(/\./g, ',')} €</p>
                    </article>
                </> : 
                <iframe 
                        src={`https://player.vimeo.com/video/${url}`}
                        width="100%" 
                        height="500px" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen
                    >    
                </iframe>}
                {description && <article className="mt-4" dangerouslySetInnerHTML={{__html: description}} />}
            </Modal.Body>
            <Modal.Footer className="row justify-content-center">
                <Button variant="dark" onClick={() => setShowVideoPopup('')}>
                    Zavrieť
                </Button>
            </Modal.Footer>
        </Modal>
    )
}