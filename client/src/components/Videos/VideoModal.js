import React, { useState } from 'react'
import moment from 'moment'

import { getImage } from '../../utils/getImage'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import {MdLock} from 'react-icons/md'

export default ({showVideoPopup, setShowVideoPopup, setAddAlert}) => {
    const {name, url, description, price, imageLink, userHasVideo} = showVideoPopup

    const handleBuyVideo = (orderObj) => {
        const oldOrders = localStorage.getItem('jakaiVideoShop') || '[]'
        const parsedOldOrders = JSON.parse(oldOrders)
        const shouldAddOrder = parsedOldOrders.some(order => order.url === orderObj.url)
        if (!shouldAddOrder) {
            const newOrders = [...parsedOldOrders, orderObj] 
            localStorage.setItem('jakaiVideoShop', JSON.stringify(newOrders))
        }
        setAddAlert(true)
    }

    return (
        <Modal size="xl" show={typeof showVideoPopup === 'object'} onHide={() => setShowVideoPopup('')}>
            <Modal.Body className="text-center" style={{fontSize: "90%", backgroundColor: 'whitesmoke'}}>
                <header style={{fontSize: '300%', fontWeight: '900'}}>{name}</header>
                {typeof price === 'number' && price > 0 && typeof userHasVideo !== 'object' ?
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
                            onClick={() => handleBuyVideo({name, url, price, imageLink})}
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
                            <Button variant="dark" className={'vertical-center-btn'} style={{fontSize: '150%'}}>Predplatiť video</Button>
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