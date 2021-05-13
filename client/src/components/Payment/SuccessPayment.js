import React, {useEffect } from 'react'
import axios from 'axios'

import { useLocation, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FcPaid } from "react-icons/fc";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export default ({userId, updateVideos, setUpdateVideos}) => {
    let query = useQuery();
    const orderId = query.get('Reference')
    const result = query.get('ResultCode')
    const paymentId = query.get('PaymentRequestId')

    useEffect(() => {
        if (orderId && orderId.length !== 0) {
            axios.post(`http://localhost:5000/orders/${orderId}/process-payment/`, {paymentResultCode: result, paymentId})
                .then(res => console.log(res.data))
                .catch(err => err && console.log(err))
                .then(() => {
                    localStorage.removeItem('jakaiVideoShop')
                    setUpdateVideos(!updateVideos)
                })            
        }
    }, [])
    
    return (
        <div className="whitesmoke-bg-pnine">
            <Container className="text-center pt-4 pb-4">
                <Row>
                    <Col>
                        <FcPaid style={{fontSize: "750%"}} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{fontSize: "150%"}}>
                        Platba za objednávku číslo {orderId} bola spracovaná. 
                        <br />Podrobnejšie detaily nájdete v sekcii <Link className="link-no-deco" to="/objednavky"><strong>Objednávky</strong></Link>.
                        <br/>Číslo platby {paymentId || 'nenájdené'}.
                    </Col>
                </Row>
            </Container>
        </div>
    )
}