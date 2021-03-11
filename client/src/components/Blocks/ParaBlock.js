import React from 'react'

import Col from 'react-bootstrap/Col'

export default ({title, text}) => {
    return (
        <>
            {title &&
            <Col className="text-center" xs={12}>
                <h2>{title}</h2>
                <br />
            </Col>}
            <Col dangerouslySetInnerHTML={{__html: text}} xs={12} />
        </>
    )
}