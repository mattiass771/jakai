import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


export default () => {
    const [collectionData, setCollectionData] = useState([])
    const [isHovered, setIsHovered] = useState("")
    
    useEffect(() => {
        axios.post(`http://localhost:5000/page/get-video-collections`)
            .then(res => setCollectionData(res.data))
            .catch(err => console.log(err))
    }, [])

    const showCollections = () => {
        return collectionData.map(collect => {
            const {_id, pageName, url} = collect
            const urlFromCollection = url.replace('-video', '')
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
                    <Link to={`/videa/${urlFromCollection}`}>
                        <Card className={`h-100`} 
                            onMouseEnter={() => handleMouseOver()} 
                            onMouseLeave={() => handleMouseLeave()} 
                            style={{ textAlign:"center", color: '#333333' }} 
                            id={urlFromCollection} 
                        >
                            <Card.Img className={`${isHovered[_id] === 'none' ? 'scale-out' : 'scale-in'}`} 
                                style={{height: '65%', width: '100%', objectFit: 'cover'}} src={`https://miro.medium.com/max/295/1*i5iqn7xB-l0kLwsJJBYEWQ.jpeg`} />
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
        <Container>
            <Row>
                {showCollections()}
            </Row>
        </Container>
    )
}