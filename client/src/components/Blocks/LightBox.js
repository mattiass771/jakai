import React, { useEffect, useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

import {ImCancelCircle} from 'react-icons/im'
import {MdNavigateNext, MdNavigateBefore} from 'react-icons/md'

export default ({expand, setExpand, getImage, images}) => {
    const [actualImage, setActualImage] = useState('')

    useEffect(() => {
        setActualImage(images.findIndex(val => val === expand))
    }, [expand])

    const handleNextImage = () => {
        const nextIndex = actualImage < images.length-1 ? actualImage+1 : 0
        setActualImage(nextIndex)
    }

    const handlePrevImage = () => {
        const prevIndex = actualImage > 0 ? actualImage-1 : images.length-1
        setActualImage(prevIndex)
    }

    useEffect(() => {

    }, [actualImage])

    const slideLeft = {
        left: 0,
        transition: 'left 1s',
    }

    return (
        <Modal style={{background: 'rgba(0,0,0,0)'}} size="lg" show={typeof expand === 'string' && expand.length !== 0} onHide={() => setExpand('')}>
            <Image src={getImage(images[actualImage])} rounded fluid />
            <MdNavigateNext className="link-no-deco" style={{ position: 'absolute', right: -15, top: '45%', fontSize: "500%"}} onClick={() => handleNextImage()} />
            <MdNavigateBefore className="link-no-deco"  style={{  position: 'absolute', left: -15, top: '45%', fontSize: "500%"}} onClick={() => handlePrevImage()} />
            <ImCancelCircle className="link-no-deco" style={{position: 'absolute', right: -15, top: -15, fontSize: "200%"}} onClick={() => setExpand('')} />
        </Modal>
    )
}