import React from 'react'
import axios from 'axios'

import {GoArrowUp, GoArrowDown} from 'react-icons/go'
import Col from 'react-bootstrap/Col'

export default ({blockId, position, max, prevBlockId, nextBlockId, prevBlockPosition = 0, nextBlockPosition = max-1, setRefresh}) => {
    const changePosition = async (direction) => {
        let newPosition = direction === 'minus' ? prevBlockPosition : nextBlockPosition
        
        const updateCurrent = axios.post(`${process.env.REACT_APP_BACKEND_URL}/blocks/edit-block-position/${blockId}`, {position: newPosition})
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message))
        const updateSwitched = axios.post(`${process.env.REACT_APP_BACKEND_URL}/blocks/edit-block-position/${direction === 'minus' ? prevBlockId : nextBlockId}`, {position})
                .then(res => console.log(res.data))
                .catch(err => console.log(err.message))
        await Promise.all([
            updateCurrent,
            updateSwitched
        ]).then(res => setRefresh())         
    }
    const iconStyles = {
        fontSize: '200%',
        color: '#AE1865',
        cursor: 'pointer',
        margin: '0px 5px'
    }
    return (
        <Col className="text-center" xs={12}>
            <GoArrowUp style={iconStyles} onClick={() => changePosition('minus')} />
            <GoArrowDown style={iconStyles} onClick={() => changePosition('plus')} />
        </Col>
    )
}