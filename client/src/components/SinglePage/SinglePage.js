import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ViewBlocks from '../Shop/ViewShop/ViewBlocks';
import Rozvrh from './Rozvrh'
import Videos from '../Videos/Videos'
import AllVideos from '../Videos/AllVideos'
import Spinner from "react-bootstrap/Spinner";

export default ({videos, isOwner, pageId, identificator, userId}) => {
    const [singlePageData, setSinglePageData] = useState(null)
    const [loading, setLoading] = useState(true);
    const [subPageId, setSubPageId] = useState('')

    useEffect(() => {
        setLoading(true)
        if (['videoCollection'].includes(identificator)) {
            setLoading(false)
            if (typeof subPageId === 'string' && subPageId.length > 0) {
                axios.get(`http://localhost:5000/page/link/${subPageId}`)
                    .then(res => {
                        setSinglePageData(res.data)
                        setSubPageId('')
                    })
                    .catch(err => console.log(err))
            }
        } else {
            axios.get(`http://localhost:5000/page/${pageId}`)
                .then(res => {
                    setSinglePageData(res.data)
                    setLoading(false)
                })
                .catch(err => console.log(err))
        }
    }, [pageId, subPageId])

    return (
        loading ? (
            <Spinner
              style={{ marginLeft: "49%", marginTop: "20%" }}
              animation="border"
            />
          ) :
        <>
            {singlePageData && 
                <div className="text-center whitesmoke-bg-pless py-4">
                    <hr className="d-none d-md-block col-md-3" />
                    <h1 >{singlePageData.pageName.toUpperCase()}</h1>
                    <hr className="d-none d-md-block col-md-3" />
                </div>}
            {identificator === 'rozvrh' && <Rozvrh />}
            {identificator === 'videoCollection' &&
                <Videos setSubPageId={setSubPageId} userId={userId} userVideos={videos} isOwner={isOwner} />
            }
            {identificator === 'videos' &&
                <AllVideos />
            }
            {singlePageData && 
            <ViewBlocks pageId={singlePageData._id} blocksData={singlePageData.blocks} isOwner={isOwner} />}
        </>
    )
}