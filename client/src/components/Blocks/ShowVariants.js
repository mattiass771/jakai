import React from 'react'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import {ImParagraphJustify, ImImage} from 'react-icons/im'

export default ({variant, setVariant}) => {
    return (
        <Row className="justify-content-center">
            <Col onClick={() => setVariant('img-only')} className="variant-select" style={{backgroundColor: variant === 'img-only' && '#c1c1c1'}}>
                <ImImage style={{fontSize: '200%'}} />
            </Col>
            <Col onClick={() => setVariant('para-para')} className="variant-select" style={{backgroundColor: variant === 'para-para' && '#c1c1c1'}}>
                <ImParagraphJustify style={{fontSize: '200%'}} />
                <ImParagraphJustify style={{fontSize: '200%'}} />
            </Col>
            <Col onClick={() => setVariant('para-img')} className="variant-select" style={{backgroundColor: variant === 'para-img' && '#c1c1c1'}}>
                <ImParagraphJustify style={{fontSize: '200%'}} />
                <ImImage style={{fontSize: '200%'}} />
            </Col>
            <Col onClick={() => setVariant('img-para')} className="variant-select" style={{backgroundColor: variant === 'img-para' && '#c1c1c1'}}>
                <ImImage style={{fontSize: '200%'}} />
                <ImParagraphJustify style={{fontSize: '200%'}} />
            </Col>
        </Row>
    )
}