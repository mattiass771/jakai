import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import logoDefault from '../../logo-default.jpg'

export default () => {
    const [collectionData, setCollectionData] = useState([])
    const [isHovered, setIsHovered] = useState("")

    const getImage = (image) => {
        try {
          const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
          return img;
        } catch {
          return null;
        }
    };
    
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/page/get-video-collections`)
            .then(res => setCollectionData(res.data))
            .catch(err => console.log(err))
    }, [])

    const showCollections = () => {
        return collectionData.map(collect => {
            const {_id, pageName, url, overviewImage, logoImage} = collect
            const urlFromCollection = url.replace('-video', '')
            const chooseImage = overviewImage || logoImage
            const handleMouseOver = () => {
                let hoverObj = {}
                hoverObj[_id] = 'none'
                setIsHovered({...isHovered, ...hoverObj})
            }
            const handleMouseLeave = () => {
                setIsHovered('')
            }
            return (
                <Col className="mt-2 mb-2" md={4} style={{height: "410px", maxWidth: '350px',  minWidth: '300px', margin: '0 auto'}} key={urlFromCollection}>
                    <Link to={`/online-kurzy/${urlFromCollection}`}>
                        <Card className={`h-100`} 
                            onMouseEnter={() => handleMouseOver()} 
                            onMouseLeave={() => handleMouseLeave()} 
                            style={{ textAlign:"center", color: '#333333' }} 
                            id={urlFromCollection} 
                        >
                            <Card.Img className={`${isHovered[_id] === 'none' ? 'scale-out' : 'scale-in'}`} 
                                style={{height: '65%', width: '100%', objectFit: 'cover'}} src={getImage(chooseImage) ? getImage(chooseImage) : logoDefault} />
                            <Card.Body>
                                    <Card.Title>
                                        <h6>Video kolekcia</h6>
                                        <h4>
                                            {pageName}
                                        </h4>
                                    </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            )
        })
    }

    return (
        <Container className="whitesmoke-bg-pless" fluid>
            <Row>
                {showCollections()}
            </Row>
        </Container>
    )
}