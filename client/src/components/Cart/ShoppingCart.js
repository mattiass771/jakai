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
    const [shipmentOnly, setShipmentOnly] = useState(false)
    const [uncheckGdpr, setUncheckGdpr] = useState(false)
    const [checkedNewsletter, setCheckedNewsletter] = useState(false)
    const [userInformation, setUserInformation] = useState('')
    const [regSuccess, setRegSuccess] = useState(false)
    const [newUser, setNewUser] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)
    const [paymentPopup, setPaymentPopup] = useState(false)
    const [orderId, setOrderId] = useState('')

    const handleSessionStorage = (customKey, value) => {
        return sessionStorage.setItem(customKey, value)
    }

    useEffect(() => {
        if (cartVideos.length > 1) {
            const total = cartVideos.reduce((sum, vid) => Number(sum.price) + Number(vid.price))
            setTotalPrice(total.toFixed(2).replace(/\./, ','))
        } else if (cartVideos.length === 1 ) {
            setTotalPrice((cartVideos[0].price).toFixed(2).replace(/\./, ','))
        }
    }, [cartVideos])


    useEffect(() => {
        const videosFromStorage = localStorage.getItem('jakaiVideoShop') || '[]'
        const parsedVideosFromStorage = JSON.parse(videosFromStorage)
        setCartVideos(parsedVideosFromStorage)        
        setOrderId(`JV${moment().unix()}`)
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
                .then(() => setShipmentOnly(true))
        }
    }, [])

    const handleRegistration = () => {
        setLogin(false)
        setShipmentOnly(false)
        setRegistration(true)
    }

    const handleLogin = () => {
        setRegistration(false)
        setShipmentOnly(false)
        setLogin(true)
    }

    const showCartVideos = () => {
        return cartVideos.map(video => {
            const {vidCollection, url, price, imageLink} = video
            return (
                <React.Fragment key={url}>
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
                        <h3>{vidCollection}</h3>
                        <p>Video číslo: {url}</p>
                        <p>Cena za mesiac: <strong>{price.toFixed(2).toString().replace(/\./, ',')} €</strong></p>
                    </Col>
                </React.Fragment>
            )
        })
    }

    const processNewOrder = () => {
        console.log({ orderId, userInformation, userId, videos: cartVideos, total: totalPrice })
        axios.post(`http://localhost:5000/orders/add`, { orderId, userInformation, userId, videos: cartVideos, total: totalPrice })
            .then(res => {
                console.log('order created!')
                if (checkedNewsletter) {
                    axios.post(`http://localhost:5000/mails/add`, {name: userInformation.fullName, email: userInformation.email})
                        .then(res => console.log(res))
                        .catch(err => err && console.log(err))
                }   
            })
            .catch(err => console.log(err))
            .then(() => {
                sessionStorage.clear()
                setPaymentPopup(true)
            })
    }
    
    const handlePayment = () => {
        if (registration) {
            setNewUser(true)
            handleLogin()
            processNewOrder()
        } else {
            processNewOrder()
        }
    }

    return (
        <div className="whitesmoke-bg-pless">
            <Container className="py-4">
                {paymentPopup && <PayGate paymentPopup={paymentPopup} setPaymentPopup={setPaymentPopup} orderInfo={{total: totalPrice, orderId}} />}
                {(cartVideos && cartVideos.length > 0) ?
                <>
                    <Row className="justify-content-center py-4">
                        <h2>Vybrané kolekcie</h2>
                    </Row>
                    <Row className="justify-content-center">
                        {showCartVideos()}
                    </Row>
                    <Row className="text-center py-4">
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
                        {registration && <SignUp newUser={newUser} setNewUser={setNewUser} setRegSuccess={setRegSuccess} regSuccess={regSuccess} uncheckGdpr={uncheckGdpr} setUncheckGdpr={setUncheckGdpr} userInformation={userInformation} shoppingCart={true} handleLogin={handleLogin} setUserInformation={setUserInformation} />}
                        {login && regSuccess && <Col xs={12}><h3 style={{color: 'green'}}>Registracia prebehla uspesne.</h3></Col> }
                        {shipmentOnly && <PlaceOrder uncheckGdpr={uncheckGdpr} setUncheckGdpr={setUncheckGdpr} checkedNewsletter={checkedNewsletter} setCheckedNewsletter={setCheckedNewsletter} setUserInformation={setUserInformation} userInformation={userInformation} />}
                    </Row>
                    <Row className="justify-content-center text-center py-4">
                        <Col>
                            <h2>
                                Finálna suma:&nbsp;
                                <strong>{totalPrice} €</strong>
                            </h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-center text-center">
                        <Col>
                            {typeof userInformation === 'object' ? 
                                <Button variant="dark" style={{fontSize: '110%'}} onClick={() => handlePayment()}>Prejsť k platbe</Button> :
                                <Button variant="dark" style={{fontSize: '110%'}} disabled>Prejsť k platbe</Button>
                            }
                        </Col>
                    </Row>
                </>
                : 
                <div className="text-center" style={{padding: '200px 0px 250px 0px'}}>
                    <h4>Nákupný košík je momentálne prázdny.</h4>
                </div>
                }
            </Container>
        </div>
    )
}