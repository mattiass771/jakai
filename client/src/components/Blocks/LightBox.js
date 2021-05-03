import React, { useEffect, useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Carousel from 'react-bootstrap/Carousel'

import {ImCancelCircle} from 'react-icons/im'
import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md'

export default ({expand, setExpand, getImage, images}) => {
    const [actualImage, setActualImage] = useState('')

    useEffect(() => {
        setActualImage(images.findIndex(val => val === expand))
    }, [expand])

    const handleSelect = (selectedIndex, e) => {
        setActualImage(selectedIndex);
    };

    const showImages = () => {
        return images.map((image, i) => {
            return (
                <Carousel.Item key={image} style={{width: '100%', background: 'rgba(0,0,0,0.0)'}}>
                    <Image style={{width: '100%'}} src={getImage(images[i])} rounded fluid />
                </Carousel.Item>
            )
        })
    }

    return (
        <Modal style={{background: 'rgba(0,0,0,0.0)'}} size="lg" show={typeof expand === 'string' && expand.length !== 0} onHide={() => setExpand('')}>
            <Carousel 
                nextIcon={<MdNavigateNext style={{fontSize: '500%', color: '#333333'}} />} 
                prevIcon={<MdNavigateBefore style={{fontSize: '500%', color: '#333333'}} />} 
                style={{width: '100%', background: 'rgba(0,0,0,0.0)'}} 
                fade={true}
                onSelect={handleSelect} 
                activeIndex={Number(actualImage)} 
                indicators={false} 
                interval={null} 
                fluid="true"
            >
                {showImages()}
            </Carousel>
            <ImCancelCircle className="link-no-deco" style={{zIndex: '+5', position: 'absolute', right: -15, top: -15, fontSize: "200%"}} onClick={() => setExpand('')} />
        </Modal>
    )
}