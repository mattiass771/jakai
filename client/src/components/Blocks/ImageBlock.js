import React from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export default ({title , imageLink }) => {
    return (
        <>
        {title &&
        <Col className="text-center" xs={12}>
            <h2>{title}</h2>
            <br />
        </Col>}
        <Col className="text-center" xs={12}>
            {imageLink.includes('youtube') ? 
            <iframe 
                width="70%" 
                height="450px" 
                src={`https://www.youtube.com/embed/${imageLink.replace('https://www.youtube.com/watch?v=','')}`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe> :
            imageLink.includes('vimeo') ? 
            <iframe 
                src={`https://player.vimeo.com/video/${imageLink.replace('https://vimeo.com/','')}`}
                width="70%" 
                height="450px" 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
            >    
            </iframe>
            : 
            <Image style={{maxHeight: '600px', minHeight: '400px', width: 'auto', objectFit: 'cover'}} src={imageLink} rounded fluid />
            }
        </Col>
        </>
    )
}