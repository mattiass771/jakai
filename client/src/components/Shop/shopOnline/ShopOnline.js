import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios"

import ViewShop from "../ViewShop"
import Spinner from "react-bootstrap/Spinner";

export default ({userId, isOwner}) => {
    const {shopUrl} = useParams()
    const [isUrlAvailible, setIsUrlAvailible] = useState(true)
    const [pageData, setPageData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/page/link/${shopUrl}`)
            .then((res) => res.data ? setPageData(res.data) : setPageData({}))
            .catch((err) => err && console.log(err))
            .then(() => {
                if (pageData._id) setIsUrlAvailible(false)
                setLoading(false)
            })
    }, [])

    return (
        loading ? 
        <Spinner
          style={{ marginLeft: "49%", marginTop: "20%" }}
          animation="border"
        /> :
        (isUrlAvailible && pageData._id && pageData.active) ?
        <ViewShop pageData={pageData} isOwner={isOwner} userId={userId} /> :
        isOwner && !pageData.active ? 
        <ViewShop pageData={pageData} isOwner={isOwner} userId={userId} /> :
        <h5 style={{ marginTop: "20%" }} className="text-center">Pod adresou https://jakai.sk/{shopUrl} ešte neexistuje žiadna stránka.</h5>
        
    )
}