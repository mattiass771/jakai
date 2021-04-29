import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { getImage } from '../../utils/getImage'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import AddVideo from './AddVideo'
import EditVideo from './EditVideo'

import { MdEdit } from "react-icons/md";

export default ({userVideos, isOwner, userId}) => {
    const [videos, setVideos] = useState([])
    const [addVideoPopup, setAddVideoPopup] = useState(false)
    const [passEditProps, setPassEditProps] = useState('')

    useEffect(() => {
        axios.post(`http://localhost:5000/videos/`)
            .then(res => setVideos(res.data))
            .catch(err => console.log(err))
    }, [addVideoPopup, passEditProps])

    const showVideos = () => {
        return videos.map(video => {
            const {_id, name, url, description, price, imageLink} = video
            return (
                <Col key={name.replace(/ /g, '-').toLowerCase()} xs={12} md={6} lg={4}>
                    {isOwner &&
                        <Button
                            onClick={() => setPassEditProps({_id, name, url, description, price, imageLink})}
                            style={{
                                width: "40px",
                                height: "40px",
                                right: 0,
                                top: 0,
                                zIndex: "+1",
                                position:'absolute'
                            }}
                            variant="outline-warning"
                        >
                            <MdEdit style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
                        </Button>}
                    <h3>{name}</h3>
                    {typeof videos === 'object' && !(price > 0) ?
                    <iframe 
                        src={`https://player.vimeo.com/video/${url}`}
                        width="100%" 
                        height="260px" 
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen
                    >    
                    </iframe>
                    : <img src={getImage(imageLink)} style={{width: '100%', height: '260px'}} />
                    }
                    {description && <p dangerouslySetInnerHTML={{__html: description}} />}
                </Col>
            )
        })
    }

    return (
        <Container className="whitesmoke-bg-pless text-center" style={{padding: '0px 75px'}} fluid>
            {isOwner && <Button variant="dark" onClick={() => setAddVideoPopup(true)} >Pridat Video</Button>}
            {isOwner && <AddVideo addVideoPopup={addVideoPopup} setAddVideoPopup={setAddVideoPopup} />}
            {typeof passEditProps === 'object' && isOwner && <EditVideo passEditProps={passEditProps} setPassEditProps={setPassEditProps} />}
            <Row className="py-4">
                {videos && showVideos()}
            </Row>
        </Container>
    )
}