import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ViewBlocks from '../Shop/ViewShop/ViewBlocks'
import Spinner from "react-bootstrap/Spinner";

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default ({isOwner}) => {
    const [rozvrhData, setRozvrhData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/page/6050e08fb8a35737f49e1552`)
            .then(res => {
                setRozvrhData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        loading ? (
            <Spinner
              style={{ marginLeft: "49%", marginTop: "20%" }}
              animation="border"
            />
          ) :
        <>
            <div style={{height: '800px', width: 'auto'}}>
                <iframe className="meo-event-calendar" style={{width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '3px'}} 
                    src="https://calendiari.com/booking/embeddedCalendar?accountId=CdKXXQZ9HkeXochPTT_DNQ&amp;view=Week" 
                    width="300" height="150"></iframe>
            </div>
            <ViewBlocks pageId={rozvrhData._id} blocksData={rozvrhData.blocks} isOwner={isOwner} />
        </>
    )
}