import React from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export default ({title, text, imageLink }) => {
    return (
        <>
            {title &&
            <Col className="text-center" xs={12}>
                <h2>{title}</h2>
                <br />
            </Col>}
            <Col xs={{order: 12, span: 12}} md={{order: 1, span: 6}}>
                {imageLink.includes('youtube') ? 
                    <iframe 
                        style={{maxHeight: '400px', minHeight: '300px', width: '100%'}}
                        src={`https://www.youtube.com/embed/${imageLink.replace('https://www.youtube.com/watch?v=','')}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen>
                    </iframe>
                    : 
                    imageLink.includes('vimeo') ? 
                    <iframe 
                        src={`https://player.vimeo.com/video/${imageLink.replace('https://vimeo.com/','')}`}
                        style={{maxHeight: '400px', minHeight: '300px', width: '100%'}}
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen
                    >    
                    </iframe>
                    : 
                    <Image style={{maxHeight: '400px', minHeight: '300px', width: '100%', objectFit: 'cover'}} src={imageLink} rounded fluid />
                }
            </Col>
            <Col dangerouslySetInnerHTML={{__html: text}} className="pb-2" xs={{order: 1, span: 12}} md={{order: 12, span: 6}} />
        </>
    )
}