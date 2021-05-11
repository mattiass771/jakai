import React, { useEffect, useState } from "react"
import moment from 'moment'
import axios from 'axios'

import { getImage } from '../../utils/getImage'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import PlaceOrder from './PlaceOrder'
import SignUp from '../Login/SignUp'
import Login from '../Login/Login'
import PayGate from './PayGate'

export default ({userId}) => {
    const [cartVideos, setCartVideos] = useState([])
    const [login, setLogin] = useState(false)
    const [registration, setRegistration] = useState(userId ? false : true)
    const [shipmentOnly, setShipmentOnly] = useState(userId ? true : false)
    const [uncheckGdpr, setUncheckGdpr] = useState(false)
    const [checkedNewsletter, setCheckedNewsletter] = useState(false)
    const [userInformation, setUserInformation] = useState('')
    const [regSuccess, setRegSuccess] = useState(false)

    const handleSessionStorage = (customKey, value) => {
        return sessionStorage.setItem(customKey, value)
    }

    const orderId = `JV${moment().unix()}`

    useEffect(() => {
        const videosFromStorage = localStorage.getItem('jakaiVideoShop') || '[]'
        const parsedVideosFromStorage = JSON.parse(videosFromStorage)
        setCartVideos(parsedVideosFromStorage)
        if (userId) {
            axios
                .post(`http://localhost:5000/users/get-user/${userId}`)
                .then((res) => {
                    if (res.data) {
                        const {fullName, email, phone, address} = res.data
                        setUserInformation({ fullName, email, phone, address })
                        const splitAddress = address.split(',')
                        const splitName = fullName.split(' ')
                        handleSessionStorage('firstName', splitName[0])
                        handleSessionStorage('lastName', splitName[1])
                        handleSessionStorage('email', email)
                        handleSessionStorage('phone', phone)
                        handleSessionStorage('city', splitAddress[2])
                        handleSessionStorage('postal', splitAddress[1])
                        handleSessionStorage('street', splitAddress[0])
                    }
                })
                .catch(err => err && console.log(err))
        }
    }, [])

    const handleRegistration = () => {
        setLogin(false)
        setShipmentOnly(false)
        setRegistration(true)
    }

    const handleShipmentOnly = () => {
        setLogin(false)
        setRegistration(false)
        setShipmentOnly(true)
    }

    const handleLogin = () => {
        setRegistration(false)
        setShipmentOnly(false)
        setLogin(true)
    }

    const showCartVideos = () => {
        return cartVideos.map(video => {
            const {name, url, price, imageLink} = video
            return (
                <>
                    <Col style={{height: '150px'}} xs={6} md={3}>
                        <img 
                            className={`box-shad-card`} 
                            src={getImage(imageLink)} 
                            style={{
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover'
                            }} 
                        />
                    </Col>
                    <Col xs={6} md={3}>
                        <h3>{name}</h3>
                        <p>Video číslo: {url}</p>
                        <p>Cena za mesiac: <strong>{price.toFixed(2).toString().replace(/\./, ',')} €</strong></p>
                    </Col>
                </>
            )
        })
    }

    return (
        <div className="whitesmoke-bg-pless">
            <Container className="py-4">
                {(cartVideos && cartVideos.length > 0) &&
                <>
                    <Row className="justify-content-center">
                        {showCartVideos()}
                    </Row>
                    <Row className="text-center pt-4">
                        <Col>
                            <h2>Fakturačné údaje {registration && 's registráciou'}</h2>
                        </Col>
                    </Row>
                    <Row className="text-center">
                        <Col>
                            {(!userInformation && !userId ) &&
                                <p>
                                    {login ? 
                                    <Button className="mt-2" onClick={() => handleRegistration()} variant="dark">Nemám účet</Button>
                                    :
                                    <Button className="mt-2" onClick={() => handleLogin()} variant="dark">Mám účet a chcem sa prihlásit</Button> 
                                    }
                                </p>
                            }
                            {userInformation && 
                                <Button className="mt-2" onClick={() => setUncheckGdpr(true)} variant="dark">Zmeniť údaje</Button>
                            }
                        </Col>
                    </Row>
                    <Row className="text-center">
                        {login && <Login shoppingCart={true} />}
                        {registration && <SignUp setRegSuccess={setRegSuccess} regSuccess={regSuccess} uncheckGdpr={uncheckGdpr} setUncheckGdpr={setUncheckGdpr} userInformation={userInformation} shoppingCart={true} handleLogin={handleLogin} setUserInformation={setUserInformation} />}
                        {registration && regSuccess && <Col><h3 style={{color: 'green'}}>Registracia prebehla uspesne.</h3></Col> }
                        {shipmentOnly && <PlaceOrder uncheckGdpr={uncheckGdpr} setUncheckGdpr={setUncheckGdpr} checkedNewsletter={checkedNewsletter} setCheckedNewsletter={setCheckedNewsletter} setUserInformation={setUserInformation} userInformation={userInformation} />}
                    </Row>
                </>}
            </Container>
        </div>
    )
}