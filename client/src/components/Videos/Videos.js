import React, {useState, useEffect} from 'react'
import moment from 'moment'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default ({videos, isOwner}) => {

    const showVideos = () => {
        return videos.map(video => {
            const {name, url, ttl} = video
            console.log(name, ' - ',ttl )
            return (
                <Col key={name.replace(/ /g, '-').toLowerCase()} md={6} style={{height: '360px'}}>
                    <h3>{name}</h3>
                    {typeof videos === 'object' &&
                    <iframe 
                        src={`https://player.vimeo.com/video/${url}`}
                        width="auto" 
                        height="100%" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen
                    >    
                    </iframe>}
                </Col>
            )
        })
    }

    return (
        <Container>
            <Row>
                {videos.length !== 0 && showVideos()}
            </Row>
        </Container>
    )
}