import React, {useState, useEffect} from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Contact from './Contact/Contact';

import { MdMailOutline } from "react-icons/md";
import { BiCodeAlt } from "react-icons/bi";
import { FaFacebookF,FaInstagram, FaYoutube } from "react-icons/fa";

export default ({showLawPopup, setShowLawPopup}) => {
  const footerStyles = {
    width: '100%',
    zIndex: '+2',
    backgroundColor: 'WHITESMOKE'
  }

    return (
      <div className="pt-4 pb-3" style={{...footerStyles}}>
        <Row style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Col xs={12} md={6}>
            <Container className="py-4">
              <Row className="text-center">
                <Col className="mb-2" xs={12}>
                  <a rel="noopener noreferrer" target="_blank" href="https://facebook.com/jakai.studio" style={{textDecoration: 'none', color: '#333333'}}>
                    <FaFacebookF style={{fontSize: '130%', marginTop: '-2px', marginRight: '-4px'}} />acebook.com<strong>/jakai.studio</strong>
                  </a>
                </Col>
                <Col className="mb-2" xs={12}>
                  <a rel="noopener noreferrer" target="_blank" href="https://instagram.com/jakaistudio" style={{textDecoration: 'none', color: '#333333'}}>
                    <FaInstagram style={{fontSize: '150%', marginTop: '-2px'}} /><strong>#jakaistudio</strong>
                  </a>
                </Col>
                <Col className="mb-2" xs={12}>
                  <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/channel/UCPtsq1f0lCYZzHXH7H4hyhg" style={{textDecoration: 'none', color: '#333333'}}>
                    <FaYoutube style={{fontSize: '150%', marginTop: '-2px'}} />&nbsp;<strong>jakai video</strong>
                  </a>
                </Col>
                <Col className="mb-2" xs={12}>
                  <a rel="noopener noreferrer" target="_blank" href="https://github.com/mattiass771" style={{textDecoration: 'none', color: '#333333'}}>
                    <BiCodeAlt style={{fontSize: '150%', marginTop: '-2px'}} /> by <strong>MZ</strong>
                  </a>
                </Col>
              </Row>
              <Row className="text-center my-2" style={{fontSize: '100%'}}>
                {/* <Col xs={12}>
                  <span style={{color: '#333333', cursor: 'pointer'}} onClick={() => setShowLawPopup('obchodne')}>Obchodné podmienky</span>
                </Col> */}
                <Col xs={12}>
                  <span style={{color: '#333333', cursor: 'pointer'}} onClick={() => setShowLawPopup('gdpr')}>Ochrana osobných údajov</span>
                </Col>
                <Col xs={12}>
                  <span style={{color: '#333333', cursor: 'pointer'}} onClick={() => setShowLawPopup('reklamacny')}>Reklamačný poriadok</span>
                </Col>
                {/* <Col xs={12}>
                  <span style={{color: '#333333', cursor: 'pointer'}} onClick={() => setShowLawPopup('doprava')}>Doprava a platba</span>
                </Col> */}
              </Row>
            </Container>
          </Col>
          <Col xs={12} md={6}>
            <Contact isSmall={true} setShowLawPopup={setShowLawPopup} />
          </Col>
        </Row>
      </div>
    )
}