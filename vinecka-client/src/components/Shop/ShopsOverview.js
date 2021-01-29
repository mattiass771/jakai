import React, {useState} from 'react';
import CreateShop from "./CreateShop";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export default ({userData, shopData}) => {
    const [showCreateShop, setShowCreateShop] = useState(false)
    const [isHovered, setIsHovered] = useState("")

    const showShops = () => {
        return shopData.map(shop => {
            const { _id, shopName, description, url } = shop
            const handleMouseOver = () => {
                let hoverObj = {}
                hoverObj[_id] = 'none'
                setIsHovered({...isHovered, ...hoverObj})
            }
            const handleMouseLeave = () => {
                let hoverObj = {}
                hoverObj[_id] = 'block'
                setIsHovered({...isHovered, ...hoverObj})
            }
            return (
                <Col className="mt-2 mb-2" md={4} key={_id} >
                    <Link to={`/${url}`}>
                        <Card onMouseEnter={() => handleMouseOver()} onMouseLeave={() => handleMouseLeave()} style={{ textAlign:"center", color: "whitesmoke" }} id={_id} >
                            <Card.Img src="https://miro.medium.com/max/295/1*i5iqn7xB-l0kLwsJJBYEWQ.jpeg" />
                            <Card.ImgOverlay className={`${isHovered[_id] === 'none' ? 'fade-out' : 'fade-in'}`} style={{ background: "rgba(52,58,64,0.4)"}} >
                                    <Card.Title>
                                        {shopName}
                                    </Card.Title>
                                    <Card.Text>
                                        {description}
                                    </Card.Text>
                            </Card.ImgOverlay>
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
                    <CreateShop userData={userData} /> :
                    <Button style={{marginTop: "20px"}} variant="dark" onClick={() => setShowCreateShop(true)}>New Shop</Button>
                    }
                </Col>}
            </Row>
            <Row className="mt-4">
                {showShops()}
            </Row>
        </Container>
    )
}