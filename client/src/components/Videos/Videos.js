import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import AddVideo from './AddVideo'

export default ({userVideos, isOwner, userId}) => {
    const [videos, setVideos] = useState([])
    const [addVideoPopup, setAddVideoPopup] = useState(false)

    useEffect(() => {
        axios.post(`http://localhost:5000/videos/`)
            .then(res => setVideos(res.data))
            .catch(err => console.log(err))
    }, [addVideoPopup])

    const showVideos = () => {
        return videos.map(video => {
            const {name, url, description} = video

            return (
                <Col key={name.replace(/ /g, '-').toLowerCase()} xs={12} md={6} lg={4}>
                    <h3>{name}</h3>
                    {description && <p dangerouslySetInnerHTML={{__html: description}} />}
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
        <Container className="whitesmoke-bg-pless text-center" style={{padding: '0px 75px'}} fluid>
            {isOwner && <Button variant="dark" onClick={() => setAddVideoPopup(true)} >Pridat Video</Button>}
            {isOwner && <AddVideo addVideoPopup={addVideoPopup} setAddVideoPopup={setAddVideoPopup} />}
            <Row>
                {videos && showVideos()}
            </Row>
        </Container>
    )
}