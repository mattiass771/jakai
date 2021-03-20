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
        <Col xs={12}>
            <Image src={imageLink} rounded />
        </Col>
        </>
    )
}