import React from 'react'

import Col from 'react-bootstrap/Col'

export default ({title, text}) => {
    return (
        <>
            {title &&
            <Col xs={12}>
                <h2>{title}</h2>
                <br />
            </Col>}
            <Col xs={12}>
                {text}
            </Col>  
        </>
    )
}