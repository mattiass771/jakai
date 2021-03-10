import React, { useEffect, useState } from 'react';
import axios from 'axios'

import ParaImageBlock from '../../Blocks/ParaImageBlock'
import ImageParaBlock from '../../Blocks/ImageParaBlock'
import ParaBlock from '../../Blocks/ParaBlock'
import ImageBlock from '../../Blocks/ImageBlock'

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


export default ({blocksData, isOwner}) => {
    const [blocks, setBlocks] = useState([])
    useEffect(() => {
        const getData = async id => {
            await axios.get(`http://localhost:5000/blocks/${id}`).then((res) => {
                setBlocks(prev => [...prev, res.data])
                console.log('block fetched: ', res.data)
            }).catch(err => console.log('error fetching blocks', err))
        }
        blocksData.reduce(
            async (chain, blockId) =>
              await chain.then(async _ => await getData(blockId)),
            Promise.resolve([])
        )
    },[])

    const getImage = (image) => {
        try {
          const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
          return img;
        } catch {
          return null;
        }
    };

    const ShowBlocks = () => {
        console.log(blocks)
        return blocks.map((block, i) => {
            const {variant, title, text, imageLink} = block
            const pinkStripe = i%2 ? 'whitesmoke-bg-pink' : ''
            switch(variant) {
                case 'para-para':
                    return (
                        <Row className={`text-center justify-content-center p-4 ${pinkStripe}`}>
                            <ParaBlock title={title} text={text} />
                        </Row>
                    )
                case 'para-img':
                    return (
                        <Row className={`text-center justify-content-center p-4 ${pinkStripe}`}>
                            <ParaImageBlock title={title} text={text} imageLink={getImage(imageLink)} />
                        </Row>
                    )
                case 'img-para':
                    return (
                        <Row className={`text-center justify-content-center p-4 ${pinkStripe}`}>
                            <ImageParaBlock title={title} text={text} imageLink={getImage(imageLink)} />
                        </Row>
                    )
                case 'img-only':
                    return (
                        <Row className={`text-center justify-content-center p-4 ${pinkStripe}`}>
                            <ImageBlock title={title} imageLink={imageLink} />
                        </Row>
                    )
            }
        })
    }
    return (
        <div style={{fontSize: '120%'}}>
            <ShowBlocks />
        </div>
    )
}