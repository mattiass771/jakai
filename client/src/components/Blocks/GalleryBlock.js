import React, { useState } from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import LightBox from './LightBox'

export default ({title, text, images }) => {
    const [expand, setExpand] = useState('')

    const getImage = (image) => {
        try {
          const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
          return img;
        } catch {
          return null;
        }
    };
    const showImages = () => {
        return images.map(image => {
            return (
                <Col 
                    onClick={() => setExpand(image)} 
                    className={`mt-2`}
                    style={{maxHeight: '450px', cursor: 'pointer'}}
                    sm={12} md={6} lg={4} xl={3} 
                    key={image}
                >
                    <Image style={{ height: '100%', width: '100%', objectFit: 'cover'}} src={getImage(image)} rounded />
                </Col>
            )
        })
    }
    return (
        <>
            <LightBox expand={expand} setExpand={setExpand} getImage={getImage} images={images} />
            {title &&
            <Col className="text-center" xs={12}>
                <h2>{title}</h2>
                <br />
            </Col>}
            <Col className="text-center" dangerouslySetInnerHTML={{__html: text}} xs={12} className="pb-2" />
            {showImages()}
        </>
    )
}