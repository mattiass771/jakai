import React, { useState } from 'react'

import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import LightBox from './LightBox'

export default ({title, text, images }) => {
    const [expand, setExpand] = useState('')
    const [isHovered, setIsHovered] = useState('')

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
                <div 
                    onClick={() => setExpand(image)} 
                    className={`
                        mt-4
                        ${images.length === 1 && 'col-12'} 
                        ${images.length === 2 && 'col-xs-12 col-md-6'} 
                        ${!(images.length % 3) && images.length <= 9 && 'col-xs-12 col-md-4'}
                        ${images.length === 4 && 'col-xs-12 col-md-6'} 
                        ${!(images.length % 4) && images.length > 4 && 'col-xs-12 col-md-6 col-lg-4 col-xl-3'}
                        ${images.length > 4 && images.length < 8 && 'col-xs-12 col-md-6 col-lg-4'} 
                        ${images.length >= 8 && 'col-xs-12 col-md-6 col-lg-4 col-xl-3'} 
                    `}
                    style={{maxHeight: '450px', cursor: 'pointer'}}
                    key={image}
                >
                    <Image 
                        className={`box-shad-card ${isHovered === image ? 'scale-out-marg' : 'scale-in-marg'}`} 
                        onMouseEnter={() => setIsHovered(image)}
                        onTouchStart={() => setIsHovered(image)}
                        onMouseLeave={() => setIsHovered('')}
                        onTouchEnd={() => setIsHovered('')}
                        style={{ height: '100%', width: '100%', objectFit: 'cover'}} 
                        src={getImage(image)} 
                        rounded 
                    />
                </div>
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