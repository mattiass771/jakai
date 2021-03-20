import React from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

export default ({title, text, imageLink }) => {
    return (
        <>
            {title &&
            <Col className="text-center" xs={12}>
                <h2>{title}</h2>
                <br />
            </Col>}
            <Col dangerouslySetInnerHTML={{__html: text}} xs={12} md={6} className="pb-2" />
            <Col xs={12} md={6}>
                <Image src={imageLink} rounded fluid />
            </Col>
        </>
    )
}