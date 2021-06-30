import React from 'react'

import Col from 'react-bootstrap/Col'

export default ({title, text, centered}) => {
    return (
        <>
            {title &&
            <Col className="text-center" xs={12}>
                <h2>{title}</h2>
                <br />
            </Col>}
            <Col className={centered ? "text-center" : ""} dangerouslySetInnerHTML={{__html: text}} xs={12} />
        </>
    )
}