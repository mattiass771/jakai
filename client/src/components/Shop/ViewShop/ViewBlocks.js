import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import ParaImageBlock from '../../Blocks/ParaImageBlock'
import ImageParaBlock from '../../Blocks/ImageParaBlock'
import ParaBlock from '../../Blocks/ParaBlock'
import ImageBlock from '../../Blocks/ImageBlock'
import GalleryBlock from '../../Blocks/GalleryBlock'
import EditBlock from '../../Blocks/EditBlock'
import AddBlock from '../../Blocks/AddBlock'
import MoveBlock from '../../Blocks/MoveBlock'

import { MdEdit } from "react-icons/md";

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


export default ({pageId, blocksData, isOwner, noRozvrh}) => { 
    let history = useHistory()
    const [blocks, setBlocks] = useState([])
    const [passEditProps, setPassEditProps] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [addBlockPopup, setAddBlockPopup] = useState(false)

    useEffect(() => {
        setBlocks([])
        const getData = async id => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/blocks/${id}`).then((res) => {
                if (res.data) setBlocks(prev => [...prev, res.data])
            }).catch(err => console.log('error fetching blocks', err))
        }
        blocksData.reduce(
            async (chain, blockId) =>
              await chain.then(async _ => await getData(blockId)),
            Promise.resolve([])
        )
    },[refresh])

    const getImage = (image) => {
        if (image.includes('youtube') || image.includes('vimeo')) {
            return image
        }
        try {
          const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
          return img;
        } catch {
          return null;
        }
    };

    const ShowBlocks = () => {
        const createSortIndexes = blocks.map((block,i) => {
            if (block.position >= 0) {
                return block
            } 
            return {...block, position: i}
        })
        const sortedBlocks = createSortIndexes.sort((a,b) => a.position - b.position)
        console.log(sortedBlocks)
        return sortedBlocks.map((block, i) => {
            const {_id, variant, title, text, imageLink, images, centered, position} = block
            const pinkStripe = !(i%2) ? 'pink-bg-pnine' : ''
            switch(variant) {
                case 'para-para':
                    return (
                        <Row key={_id} className={`page-breaks justify-content-center ${pinkStripe}`}>
                            {isOwner && <MoveBlock setRefresh={() => setRefresh(!refresh)} max={blocks.length} blockId={_id} prevBlockPosition={sortedBlocks[i -1] && sortedBlocks[i-1].position} nextBlockPosition={sortedBlocks[i +1] && sortedBlocks[i+1].position} prevBlockId={sortedBlocks[i-1] && sortedBlocks[i-1]._id} nextBlockId={sortedBlocks[i+1] && sortedBlocks[i+1]._id} position={position || i} />}
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, imageLink, images, variant, centered})}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        marginTop: "-40px",
                                        zIndex: "+1",
                                        position:'absolute'
                                    }}
                                    variant="outline-warning"
                                >
                                    <MdEdit style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
                                </Button>}
                            <ParaBlock title={title} text={text} centered={centered} />
                        </Row>
                    )
                case 'para-img':
                    return (
                        <Row key={_id} className={`page-breaks justify-content-center ${pinkStripe}`}>
                            {isOwner && <MoveBlock setRefresh={() => setRefresh(!refresh)} max={blocks.length} blockId={_id} prevBlockPosition={sortedBlocks[i -1] && sortedBlocks[i-1].position} nextBlockPosition={sortedBlocks[i +1] && sortedBlocks[i+1].position} prevBlockId={sortedBlocks[i-1] && sortedBlocks[i-1]._id} nextBlockId={sortedBlocks[i+1] && sortedBlocks[i+1]._id} position={position || i} />}
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, imageLink, images, variant, centered})}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        marginTop: "-40px",
                                        zIndex: "+1",
                                        position:'absolute'
                                    }}
                                    variant="outline-warning"
                                >
                                    <MdEdit style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
                                </Button>}
                            <ParaImageBlock title={title} text={text} imageLink={getImage(imageLink)}  centered={centered} />
                        </Row>
                    )
                case 'img-para':
                    return (
                        <Row key={_id} className={`page-breaks justify-content-center ${pinkStripe}`}>
                            {isOwner && <MoveBlock setRefresh={() => setRefresh(!refresh)} max={blocks.length} blockId={_id} prevBlockPosition={sortedBlocks[i -1] && sortedBlocks[i-1].position} nextBlockPosition={sortedBlocks[i +1] && sortedBlocks[i+1].position} prevBlockId={sortedBlocks[i-1] && sortedBlocks[i-1]._id} nextBlockId={sortedBlocks[i+1] && sortedBlocks[i+1]._id} position={position || i} />}
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, imageLink, images, variant, centered})}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        marginTop: "-40px",
                                        zIndex: "+1",
                                        position:'absolute'
                                    }}
                                    variant="outline-warning"
                                >
                                    <MdEdit style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
                                </Button>}
                            <ImageParaBlock title={title} text={text} imageLink={getImage(imageLink)} centered={centered} />
                        </Row>
                    )
                case 'img-only':
                    return (
                        <Row key={_id} className={`page-breaks justify-content-center ${pinkStripe}`}>
                            {isOwner && <MoveBlock setRefresh={() => setRefresh(!refresh)} max={blocks.length} blockId={_id} prevBlockPosition={sortedBlocks[i -1] && sortedBlocks[i-1].position} nextBlockPosition={sortedBlocks[i +1] && sortedBlocks[i+1].position} prevBlockId={sortedBlocks[i-1] && sortedBlocks[i-1]._id} nextBlockId={sortedBlocks[i+1] && sortedBlocks[i+1]._id} position={position || i} />}
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, imageLink, images, variant, centered})}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        marginTop: "-40px",
                                        zIndex: "+1",
                                        position:'absolute'
                                    }}
                                    variant="outline-warning"
                                >
                                    <MdEdit style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
                                </Button>}
                            <ImageBlock title={title} imageLink={getImage(imageLink)} />
                        </Row>
                    )
                case 'gallery':
                    return (
                        <Row key={_id} className={`page-breaks justify-content-center ${pinkStripe}`}>
                            {isOwner && <MoveBlock setRefresh={() => setRefresh(!refresh)} max={blocks.length} blockId={_id} prevBlockPosition={sortedBlocks[i -1] && sortedBlocks[i-1].position} nextBlockPosition={sortedBlocks[i +1] && sortedBlocks[i+1].position} prevBlockId={sortedBlocks[i-1] && sortedBlocks[i-1]._id} nextBlockId={sortedBlocks[i+1] && sortedBlocks[i+1]._id} position={position || i} />}
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, imageLink, images, variant, centered})}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        marginTop: "-40px",
                                        zIndex: "+1",
                                        position:'absolute'
                                    }}
                                    variant="outline-warning"
                                >
                                    <MdEdit style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
                                </Button>}
                            <GalleryBlock title={title} images={images} text={text} />
                        </Row>
                    )
            }
            
        })
    }
    return (
        <Container className="whitesmoke-bg-pless py-4" style={{fontSize: '120%'}} fluid>
            {typeof passEditProps === 'object'&& isOwner && <EditBlock pageId={pageId} setRefresh={() => setRefresh(!refresh)} refresh={refresh} blockData={passEditProps} setPassEditProps={setPassEditProps} />}
            {isOwner && <AddBlock pageId={pageId} setRefresh={() => setRefresh(!refresh)} refresh={refresh} addBlockPopup={addBlockPopup} setAddBlockPopup={setAddBlockPopup} />}
            <ShowBlocks />
            {isOwner &&
            <div className="text-center">
                <Button className="mt-4" size="sm" variant="success" onClick={() => setAddBlockPopup(true)} >Pridat Blok</Button>
            </div>}
            {!noRozvrh &&
            <Row className="mt-4 text-center">
                <Col>
                    <Button onClick={() => history.push('/rozvrh')} variant="danger">Rozvrh lekcií a kurzov v Jakai!</Button>
                </Col>
            </Row>}
        </Container>
    )
}