import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import {useHistory, useParams} from 'react-router-dom'

import { getImage } from '../../utils/getImage'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import AddVideo from './AddVideo'
import EditVideo from './EditVideo'
import VideoModal from './VideoModal'

import { MdEdit } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri"
import { HiBadgeCheck } from "react-icons/hi"

export default ({setSubPageId, userVideos, isOwner, userId}) => {
    let history = useHistory()
    const {kolekcia} = useParams()
    const [addAlert, setAddAlert] = useState(false)
    const [videos, setVideos] = useState([])
    const [addVideoPopup, setAddVideoPopup] = useState(false)
    const [passEditProps, setPassEditProps] = useState('')
    const [showVideoPopup, setShowVideoPopup] = useState('')
    const [isHovered, setIsHovered] = useState('')

    useEffect(() => {
        setSubPageId(`${kolekcia}-video`)
    }, [kolekcia])

    useEffect(() => {
        axios.post(`http://localhost:5000/videos/get-videos-from-collection/${kolekcia}`)
            .then(res => setVideos(res.data))
            .catch(err => console.log(err))
    }, [addVideoPopup, passEditProps])

    const showVideos = () => {
        return videos.map(video => {
            const {_id, name, url, description, price, imageLink, vidCollection} = video
            
            const userHasVideo = (userVideos && userId) ? userVideos.find(userVid => userVid.url === url) : ''
            
            if (userId && typeof userHasVideo === 'object' && userHasVideo.ttl && moment().toISOString() > userHasVideo.ttl) {
                axios.post(`http://localhost:5000/users/${userId}/expired-video`, {videoId: url})
                    .then(res => console.log('video removed ', res.data))
                    .catch(err => console.log(err))
            }

            return (
                <Col className="py-4" key={name.replace(/ /g, '-').toLowerCase()} xs={12} md={6} lg={4}>
                    {isOwner &&
                        <Button
                            onClick={() => setPassEditProps({_id, name, url, description, price, imageLink, vidCollection})}
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
                    {(!(price > 0) || (userId && typeof userHasVideo === 'object' && userHasVideo.ttl && moment().toISOString() <= userHasVideo.ttl)) &&
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{!(price > 0) ? `Toto video môžete pozerať úplne zadarmo!` : `Video máte zakúpené do ${moment(userHasVideo.ttl).format('DD.MM.YYYY, HH:mm')}`}</Tooltip>}>
                        <HiBadgeCheck
                            style={{
                                width: "40px",
                                height: "40px",
                                right: 20,
                                top: 95,
                                zIndex: "+99",
                                position:'absolute',
                                color: 'whitesmoke',
                                backgroundColor: '#AE1865',
                                borderRadius: '5px'
                            }}
                        />
                    </OverlayTrigger>
                    }
                    <h3>{name}</h3>
                    <figure style={{height: '260px', width: '100%'}}>
                        <RiVideoFill 
                            className={`${isHovered === _id ? 'fade-out-play' : 'fade-in-play'}`}
                            style={{
                                fontSize: '500%',
                                color: '#AE1865',
                                pointerEvents: 'none',
                                zIndex: '+9',
                                position: 'relative',
                                marginBottom: '-280px'
                            }}
                        />
                        <img 
                            className={`box-shad-card ${isHovered === _id ? 'scale-out-marg' : 'scale-in-marg'}`} 
                            onClick={() => setShowVideoPopup({_id, name, url, description, price, imageLink, userId, userHasVideo, vidCollection})} 
                            onMouseEnter={() => setIsHovered(_id)}
                            onTouchStart={() => setIsHovered(_id)}
                            onMouseLeave={() => setIsHovered('')}
                            onTouchEnd={() => setIsHovered('')}
                            src={getImage(imageLink)} 
                            style={{
                                width: '100%', 
                                height: '260px', 
                                objectFit: 'cover', 
                                cursor: 'pointer', 
                                opacity: isHovered === _id ? '1.0' : '0.9'
                            }} 
                        />
                    </figure>
                </Col>
            )
        })
    }

    return (
        <Container className="whitesmoke-bg-pless text-center" style={{padding: '0px 75px'}} fluid>
            {addAlert && 
                <Alert className="text-left" variant="dark" onClose={() => setAddAlert(false)} dismissible style={{color: 'whitesmoke', position: 'fixed', top: 0, right: 0, zIndex: '+9999999999', backgroundColor: '#AE1865'}}>
                    <Alert.Heading>Video bolo pridané do košíka!</Alert.Heading>
                    <Button variant="dark" onClick={() => history.push('/kosik')}>Prejsť k platbe</Button>
                </Alert>}
            {isOwner && <Button variant="dark" onClick={() => setAddVideoPopup(true)} >Pridat Video</Button>}
            {isOwner && <AddVideo kolekcia={kolekcia} addVideoPopup={addVideoPopup} setAddVideoPopup={setAddVideoPopup} />}
            {typeof passEditProps === 'object' && isOwner && <EditVideo kolekcia={kolekcia} passEditProps={passEditProps} setPassEditProps={setPassEditProps} />}
            {typeof showVideoPopup === 'object' && <VideoModal setAddAlert={setAddAlert} showVideoPopup={showVideoPopup} setShowVideoPopup={setShowVideoPopup} />}
            <Row className="py-4">
                {videos && showVideos()}
            </Row>
        </Container>
    )
}