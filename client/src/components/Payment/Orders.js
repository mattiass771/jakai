import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {BsTrashFill} from "react-icons/bs";
import DeleteModal from "./DeleteModal";

export default ({userEmail, isOwner}) => {
    const [ordersData, setOrdersData] = useState([])
    const [expandedObj, setExpandedObj] = useState({})

    const [maxDate, setMaxDate] = useState(new Date())
    const [minDate, setMinDate] = useState(new Date('2021-01-01'))

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [passDeleteId, setPassDeleteId] = useState('')
    // TODO: pridat moznost znovu zaplatit pri rejected order

    useEffect(() => {
        axios.get(`http://localhost:5000/orders`)
            .then(res => {
                const result = res.data
                const validatedOrdersData = isOwner ? result : result.filter(obj => obj.email === userEmail)
                setOrdersData(validatedOrdersData)
            })
            .catch(err => err && console.log(err.data))
    }, [])

    const handleExpanded = (_id) => {
        let newObj = {}
        const oldValue = expandedObj[_id] ?? false
        newObj[_id] = !oldValue
        setExpandedObj({...expandedObj, ...newObj})
    }

    const ShowOrderDetails = ({passVideos}) => {
        return passVideos.map((shop, i) => {
            const { name, url, price } = shop
            return (
                <Container key={url} fluid>
                    <Row className="justify-content-center text-center py-2">
                        <Col md={4}><h5>Nazov: <strong>{name}</strong></h5></Col>
                        <Col md={4}><h5>Cislo: <strong>{url}</strong></h5></Col>
                        <Col md={4}><h5>Cena: <strong>{price} €</strong></h5></Col>
                    </Row>
                </Container>
            )
        })
    }

    const ShowBuyerDetails = ({passUserInformation, buyerId}) => {
        const { fullName, phone, address, iban } = passUserInformation
        return (
            <div className="text-center" key={buyerId}>
                <Row>
                    <Col md={{span: 2, offset: 1}}><strong>{fullName}</strong></Col>
                    <Col md={2}><strong>{phone}</strong></Col>
                    <Col md={3}><strong>{address}</strong></Col>
                    <Col md={{span: 3}}><strong>{iban ?? 'IBAN NENAJDENY'}</strong></Col>
                </Row>
                <hr />
            </div>
        )
    }

    const setFilter = (orders) => {
        const newOrdersData = orders.filter(data => {
            if ((moment(data.createdAt).toISOString() <= moment(maxDate).toISOString()) && (moment(data.createdAt).toISOString() >= moment(minDate).toISOString())) {
                return data
            }
        })
        return newOrdersData
    }

    const handleDeleteModal = (e, id) => {
        e.stopPropagation()
        let expandObj = {}
        const oldValue = expandedObj[id] ?? false
        expandObj[id] = oldValue

        setExpandedObj({...expandedObj, ...expandObj})
        setPassDeleteId(id)
        setShowDeleteModal(true)
    }

    const ShowOrders = () => {
        const filteredData = setFilter(ordersData)
        return filteredData.map(order => {
            const { _id, orderId, userInformation, createdAt, status, videos, total, userId: buyerId } = order
            const { email } = userInformation
            const statusColor = status === 'vytvorena' ? 'orange' : status === 'zaplatena' ? 'green' : status === 'odmietnuta' ? 'red' : 'black';
            return (
                <tbody key={orderId}>
                    <tr onClick={() => handleExpanded(_id)}>
                        <td>{orderId}</td>
                        <td>{email}</td>
                        <td>{moment(createdAt).format("DD MMM YYYY, HH:mm")}</td>
                        <td>{total.replace(/\./g,',')} €</td>
                        <td style={{color: statusColor}}>{status}
                            {isOwner &&
                                <BsTrashFill style={{float: "right", cursor: 'pointer', marginRight: '6px', color: "#333333"}} onClick={(e) => handleDeleteModal(e, _id)} />
                            }
                        </td>
                    </tr>
                    {expandedObj[_id] &&
                    <tr style={{backgroundColor: status === 'odmietnuta' ? '#ffecec' : 'rgb(250, 250, 250)' }}>
                        <td colSpan="5">
                            <ShowBuyerDetails passUserInformation={userInformation} buyerId={buyerId} />
                            <ShowOrderDetails passVideos={videos} />
                        </td>    
                    </tr>}
                </tbody>
            )
        })
    }

    return (
        <>
        {isOwner && showDeleteModal &&
            <DeleteModal deleteId={passDeleteId} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal} />
        }
        <Row className="justify-content-center mt-4">
            <Col className="form-group text-right">
                <strong>Od: </strong><DatePicker className="text-center" dateFormat="dd.MM.yyyy" maxDate={new Date()} selected={minDate} onChange={date => setMinDate(date)} />
            </Col>
            <Col className="form-group text-left">
                <strong>Do: </strong><DatePicker className="text-center" dateFormat="dd.MM.yyyy" maxDate={new Date()} selected={maxDate} onChange={date => setMaxDate(date)} />
            </Col>
        </Row>
        <Table style={{backgroundColor: "whitesmoke"}} striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Datum</th>
                    <th>Total</th>
                    <th>Stav</th>
                </tr>
            </thead>
            <ShowOrders />
        </Table>    
        </>
    )
}