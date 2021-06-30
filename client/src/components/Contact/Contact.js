import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import emailjs from 'emailjs-com';

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";

import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

export default ({isSmall, setShowLawPopup}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [sending, setSending] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [checkedGdpr, setCheckedGdpr] = useState(false)
    const [checkedNewsletter, setCheckedNewsletter] = useState(false)

    const sendEmail = (e) => {
        e.preventDefault();
        setSending(true)

        emailjs.sendForm('service_vuw0yrm', 'template_h67jutc', e.target, 'user_VzT160xQwoARc06cLseSO')
        .then((result) => {
            if (checkedNewsletter || isSmall) {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/mails/add`, {name, email})
                    .then(res => console.log(res))
                    .catch(err => err && console.log(err))
            }
            setSending(false)
            setName('')
            setEmail('')
            setMessage('')
            setSuccess(true)
            setTimeout(() => setSuccess(false), 2000)
        }, (error) => {
            setSending(false)
            setFailed(true)
            setTimeout(() => setFailed(false), 2000)
        });
    }

  return (
    <div className={isSmall ? "" : "whitesmoke-bg-pnine"}>
        {isSmall ? null : 
        <Container className="py-4">
            <Row className="text-center py-4">
                <Col xs={3}><hr style={{backgroundColor: '#AE1865', height: '1px', marginTop: '22px'}} /></Col>
                <Col xs={6}><h1>Nájdete nás!</h1></Col>
                <Col xs={3}><hr style={{backgroundColor: '#AE1865', height: '1px', marginTop: '22px'}} /></Col>
            </Row>
            <Row className="text-center pb-4">
                <Col style={{paddingLeft: '15%', paddingRight: '15%', fontSize: '120%'}}>
                    Štúdio Jakaí sa nachádza na križovatke Hodonínska a Podháj v blízkosti Lidla a OD Lamač.
                    Na križovatke sú 2 výškové budovy – dvojíčky. Štúdio je v budove bližšie k Hodonínskej.
                    Vchod je zo zadnej časti terasy od OD Lamač.
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.4285960986244!2d17.044395287305104!3d48.19835997475757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8deb676a3287%3A0x17e10ba271a6cf32!2zxaB0w7pkaW8gSkFLQcON!5e0!3m2!1ssk!2ssk!4v1562678653906!5m2!1ssk!2ssk" 
                        width="100%" 
                        height="450" 
                        frameBorder="0" 
                        allowFullScreen=""
                        style={{
                            paddingLeft: '5%',
                            paddingRight: '5%'
                        }}
                    ></iframe>
                </Col>
            </Row>
            <Row className="page-breaks justify-content-center">
                <Col className="text-center">
                    <Image style={{maxHeight: '600px', minHeight: '400px', width: 'auto', objectFit: 'cover'}} src={'https://jakaibucket.s3.eu-central-1.amazonaws.com/page-image-IMG-4646.jpeg'} rounded fluid />
                </Col>
            </Row>
        </Container>}
        <Container className="pb-4">
            {isSmall ? null : 
            <Row className="mb-4 mt-4 text-center justify-content-center">
                <Col xs={3}><hr style={{backgroundColor: '#AE1865', height: '1px', marginTop: '22px'}} /></Col>
                <Col xs={6}><h1>Kontaktujte nás!</h1></Col>
                <Col xs={3}><hr style={{backgroundColor: '#AE1865', height: '1px', marginTop: '22px'}} /></Col>
            </Row>}
            <Form className="contact-form" onSubmit={sendEmail}>
                <input type="hidden" name="contact_number" />
                <Row className="justify-content-center text-center mt-2">
                    <Col md={10}>
                        <label htmlFor="from_name">Meno</label>
                        <input 
                            className="form-control text-center"
                            type="text" 
                            name="from_name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center text-center mt-2">
                    <Col md={10}>
                    <label htmlFor="from_email">Email</label>
                    <input 
                        className="form-control text-center"
                        type="email" 
                        name="from_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    </Col>
                </Row>
                {isSmall ? 
                <input type="hidden" name="message" value={`${name} sa prihlásil na odber Newslettera.`} /> :
                <Row className="justify-content-center text-center mt-2">
                    <Col md={10}>
                    <label htmlFor="message">Správa</label>
                    <textarea 
                        className="form-control text-center"
                        style={{minHeight: "100px"}}
                        name="message" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    </Col>
                </Row>}
                <Row className="justify-content-center mt-2">
                    <Col md={10}>
                    <em style={{float: 'left', fontSize: isSmall ? '80%' : ''}}>
                        <Checkbox 
                            style={{
                                cursor: 'pointer',
                            }}
                            color="info"
                            shape="curve"
                            animation="jelly"
                            name='checkedGdpr'
                            checked={checkedGdpr}
                            onChange={() => setCheckedGdpr(!checkedGdpr)}
                        />&nbsp;
                        {isSmall && 
                            <span>
                                Chcem odoberať newsletter a týmto súhlasím s odoberaním newslettra webstránky jakai.sk. Tento súhlas môžete odvolať, napríklad <Link to="/odhlasit-newsletter">tu</Link>, alebo na konci každého newsletter emailu.<br />
                            </span>
                        }
                        Súhlasím so <Link to={window.location.pathname} onClick={() => setShowLawPopup('obchodne')}>spracovávaním osobných údajov.</Link></em>
                    </Col>
                </Row>
                {isSmall ? null : 
                <Row className="justify-content-center mt-2">
                    <Col md={10}>
                    <em style={{float: 'left'}}>
                        <Checkbox 
                            style={{
                                cursor: 'pointer',
                            }}
                            color="info"
                            shape="curve"
                            animation="jelly"
                            name='checkedNewsletter'
                            checked={checkedNewsletter}
                            onChange={() => setCheckedNewsletter(!checkedNewsletter)}
                        />&nbsp;
                        Chcem odoberať newsletter a týmto súhlasím s odoberaním newslettra eshopu jakai.sk. Tento súhlas môžete odvolať, napríklad <Link to="/odhlasit-newsletter">tu</Link>, alebo na konci každého newsletter emailu.</em>
                    </Col>
                </Row>}
                {success &&
                <Row className="justify-content-center text-center mt-2">
                    <Col md={10}> 
                        <Alert variant="success">
                            Váš email bol úspešne odoslaný.
                        </Alert>
                    </Col>
                </Row>}
                {failed &&
                <Row className="justify-content-center text-center mt-2">
                    <Col md={10}> 
                        <Alert variant="danger">
                            Nepodarilo sa odoslať email.
                        </Alert>
                    </Col>
                </Row>}
                {sending &&
                <Row className="justify-content-center text-center mt-2">
                    <Col md={10}> 
                        <Spinner animation="border" style={{color: '#333333'}} />
                    </Col>
                </Row>}
                {(!failed && !success && !sending && checkedGdpr && name && email && (isSmall || message)) ?
                <Row className="justify-content-center text-center mt-2">
                    <Col>  
                        <input className="btn btn-dark" type="submit" value="Odoslať" />
                    </Col>
                </Row> : !sending ?
                <Row className="justify-content-center text-center mt-2">
                    <Col>  
                        <input className="btn btn-dark" type="submit" value="Odoslať" disabled />
                    </Col>
                </Row> : null
                }               
            </Form>
        </Container>
    </div>
  );
}