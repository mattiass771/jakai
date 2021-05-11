import React from 'react'
import moment from 'moment'
import axios from 'axios'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default ({userId, myVideos}) => {

    const showVideos = () => {
        return myVideos.map(video => {
            const {name, url} = video

            return (
                <Col key={name.replace(/ /g, '-').toLowerCase()} xs={12} md={6} lg={4}>
                    <h3>{name}</h3>
                    {typeof videos === 'object' &&
                    <iframe 
                        src={`https://player.vimeo.com/video/${url}`}
                        width="100%" 
                        height="260px" 
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
        <>
            <div className="text-center whitesmoke-bg-pless py-4">
                <hr className="d-none d-md-block col-md-3" />
                <h1>Moje videá</h1>
                <hr className="d-none d-md-block col-md-3" />
            </div>
            <Container className="whitesmoke-bg-pless text-center" style={{padding: '0px 75px'}} fluid>
                <Row>
                    {myVideos && myVideos.length !== 0 && showVideos()}
                </Row>
            </Container>
        </>
    )
}