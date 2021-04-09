import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ViewBlocks from '../Shop/ViewShop/ViewBlocks';
import Videos from '../Videos/Videos'
import Spinner from "react-bootstrap/Spinner";

export default ({videos, isOwner, pageId, identificator}) => {
    const [singlePageData, setSinglePageData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/page/${pageId}`)
            .then(res => {
                setSinglePageData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [pageId])

    return (
        loading ? (
            <Spinner
              style={{ marginLeft: "49%", marginTop: "20%" }}
              animation="border"
            />
          ) :
        <>
            <div className="text-center whitesmoke-bg-pless py-4">
                <hr className="d-none d-md-block col-md-3" />
                <h1 >{singlePageData.pageName.toUpperCase()}</h1>
                <hr className="d-none d-md-block col-md-3" />
            </div>
            {identificator === 'rozvrh' &&
            <div style={{height: '800px', width: 'auto'}}>
                <iframe className="meo-event-calendar" style={{width: '100%', height: '800px', border: '1px solid #ccc', borderRadius: '3px'}} 
                    src="https://calendiari.com/booking/embeddedCalendar?accountId=CdKXXQZ9HkeXochPTT_DNQ&amp;view=Week" 
                    width="300" height="150"></iframe>
            </div>}
            {identificator === 'videos' &&
                <Videos videos={videos} isOwner={isOwner} />
            }
            <ViewBlocks pageId={singlePageData._id} blocksData={singlePageData.blocks} isOwner={isOwner} />
        </>
    )
}