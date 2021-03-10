import React, { useEffect, useState } from 'react';
import axios from 'axios'

import ParaImageBlock from '../../Blocks/ParaImageBlock'
import ImageParaBlock from '../../Blocks/ImageParaBlock'
import ParaBlock from '../../Blocks/ParaBlock'
import ImageBlock from '../../Blocks/ImageBlock'
import EditBlock from '../../Blocks/EditBlock'

import { MdEdit } from "react-icons/md";

import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'


export default ({blocksData, isOwner = true}) => {
    const [blocks, setBlocks] = useState([])
    const [passEditProps, setPassEditProps] = useState('')
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        setBlocks([])
        const getData = async id => {
            await axios.get(`http://localhost:5000/blocks/${id}`).then((res) => {
                setBlocks(prev => [...prev, res.data])
            }).catch(err => console.log('error fetching blocks', err))
        }
        blocksData.reduce(
            async (chain, blockId) =>
              await chain.then(async _ => await getData(blockId)),
            Promise.resolve([])
        )
    },[refresh])

    const getImage = (image) => {
        try {
          const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
          return img;
        } catch {
          return null;
        }
    };

    const ShowBlocks = () => {
        return blocks.map((block, i) => {
            const {_id, variant, title, text, imageLink} = block
            const pinkStripe = i%2 ? 'pink-bg-pnine' : ''
            switch(variant) {
                case 'para-para':
                    return (
                        <Row key={_id} className={`text-center justify-content-center ${pinkStripe}`} style={{padding: '40px 60px'}}>
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, variant})}
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
                            <ParaBlock title={title} text={text} />
                        </Row>
                    )
                case 'para-img':
                    return (
                        <Row key={_id} className={`text-center justify-content-center ${pinkStripe}`} style={{padding: '40px 60px'}}>
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, imageLink, variant})}
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
                            <ParaImageBlock title={title} text={text} imageLink={getImage(imageLink)} />
                        </Row>
                    )
                case 'img-para':
                    return (
                        <Row key={_id} className={`text-center justify-content-center ${pinkStripe}`} style={{padding: '40px 60px'}}>
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, imageLink, variant})}
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
                            <ImageParaBlock title={title} text={text} imageLink={getImage(imageLink)} />
                        </Row>
                    )
                case 'img-only':
                    return (
                        <Row key={_id} className={`text-center justify-content-center ${pinkStripe}`} style={{padding: '40px 60px'}}>
                            {isOwner &&
                                <Button
                                    onClick={() => setPassEditProps({_id, title, text, variant})}
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
                            <ImageBlock title={title} imageLink={imageLink} />
                        </Row>
                    )
            }
        })
    }
    return (
        <div className="whitesmoke-bg-pless pb-4" style={{fontSize: '120%'}}>
            <EditBlock setRefresh={setRefresh} refresh={refresh} blockData={passEditProps} setPassEditProps={setPassEditProps} />
            <ShowBlocks />
        </div>
    )
}