import React from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export default ({title , imageLink }) => {
    return (
        <>
        {title &&
        <Col className="text-center" xs={12}>
            <h2>{title}</h2>
            <br />
        </Col>}
        <Col className="text-center" xs={12}>
            <Image style={{maxHeight: '600px', minHeight: '400px', width: 'auto', objectFit: 'cover'}} src={imageLink} rounded fluid />
        </Col>
        </>
    )
}