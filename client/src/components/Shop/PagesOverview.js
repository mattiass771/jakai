import React, {useState} from 'react';
import CreateShop from "./CreateShop";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export default ({userData, pageData, category}) => {
    const [showCreateShop, setShowCreateShop] = useState(false)
    const [isHovered, setIsHovered] = useState("")

    const getImage = (image) => {
        try {
          const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
          return img;
        } catch {
          return null;
        }
      };

    const showShops = () => {
        return pageData.map(shop => {
            const { _id, pageName, url, overviewImage, pageType } = shop
            const handleMouseOver = () => {
                let hoverObj = {}
                hoverObj[_id] = 'none'
                setIsHovered({...isHovered, ...hoverObj})
            }
            const handleMouseLeave = () => {
                setIsHovered('')
            }
            return (
                <Col className="mt-2 mb-2" md={4} key={_id} style={{height: "410px", maxWidth: '350px',  minWidth: '300px', margin: '0 auto'}} >
                    <Link to={`/${url}`}>
                        <Card className={`h-100`} 
                            onMouseEnter={() => handleMouseOver()} 
                            onMouseLeave={() => handleMouseLeave()} 
                            style={{ textAlign:"center", color: '#333333' }} 
                        id={_id} >
                            <Card.Img className={`${isHovered[_id] === 'none' ? 'scale-out' : 'scale-in'}`} 
                                style={{height: '65%', width: '100%', objectFit: 'cover'}} src={getImage(overviewImage) ? getImage(overviewImage) : `https://miro.medium.com/max/295/1*i5iqn7xB-l0kLwsJJBYEWQ.jpeg`} />
                            <Card.Body>
                                    <Card.Title>
                                        <h4>
                                            {pageName}
                                        </h4>
                                        {pageType &&<h5>{pageType}</h5>}
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
                {userData.isOwner && 
                <Col className="text-center">
                    {showCreateShop ? 
                    <CreateShop userData={userData} category={category} /> :
                    <Button style={{marginTop: "20px"}} variant="dark" onClick={() => setShowCreateShop(true)}>Pridať</Button>
                    }
                </Col>}
            </Row>
            <Row className="mt-4">
                {showShops()}
            </Row>
        </Container>
    )
}