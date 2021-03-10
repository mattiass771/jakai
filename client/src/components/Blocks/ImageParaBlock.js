import React from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export default ({title = 'Nazov', text = 'nejaky text', imageLink = 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg' }) => {
    return (
        <>
            {title &&
            <Col xs={12}>
                <h2>{title}</h2>
                <br />
            </Col>}
            <Col sm={6}>
                <Image src={imageLink} rounded fluid />
            </Col>
            <Col sm={6}>
                {text}
            </Col>
        </>
    )
}