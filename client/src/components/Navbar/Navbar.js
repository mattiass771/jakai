import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav";

import logo from "./logojakai.png"

import {FiShoppingCart} from "react-icons/fi"

// Navbar.js
export default ({ isLoggedIn, handleLogOut, userName }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0); 
  const [visible, setVisible] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState('PROGRAMY')
  const [selectedPricing, setSelectedPricing] = useState('CENNÍK')

  const limit = Math.max( 
    document.body.scrollHeight, 
    document.body.offsetHeight, 
    document.documentElement.clientHeight, 
    document.documentElement.scrollHeight, 
    document.documentElement.offsetHeight 
  );


  const navbarStyles = {
    position: 'fixed',
    transition: 'top 0.6s',
    width: '100%',
    zIndex: '+2',
    color: '#AE1865',
    backgroundColor: 'whitesmoke',
    fontSize: '110%'
  }

  const logoStyles = {
    position: 'fixed',
    transition: 'top 0.6s',
    zIndex: '+3',
    pointerEvents: 'none'
  }

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    if ((limit - currentScrollPos) < 1750 && currentScrollPos > 250) setVisible(false)
    else {
      setVisible((prevScrollPos > currentScrollPos) || currentScrollPos < 250 );
    }
    setPrevScrollPos(currentScrollPos);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <>
      <div className="text-center w-100" style={{...logoStyles, top: visible ? '0' : '-169px'}}>
        <img
          alt=""
          src={logo}
          width="auto"
          height="260"
          style={{marginTop: '-80px'}}
          
        />
    </div>
    <Navbar collapseOnSelect className="justify-content-center" style={{...navbarStyles, top: visible ? '0' : '-169px', paddingTop: '100px'}} variant="light" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="row justify-content-center text-center">
        <Nav className="my-4 my-md-0">
          <Nav.Link as={Link} href="/" to="/" className="navihover  pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
              DOMOV
          </Nav.Link>

          <Nav.Link as={Link} href="/rozvrh" to="/rozvrh" className="navihover  pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
              ROZVRH
          </Nav.Link>

          <NavDropdown title={<span style={{color: '#333333'}}>{selectedCourses}</span>} id="basic-nav-dropdown" className="navihover">
            <Nav.Link onClick={() => setSelectedCourses('LEKCIE A KURZY')} as={Link} href="/lekcie-kurzy" to="/lekcie-kurzy" className="navihover  pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
                LEKCIE A KURZY
            </Nav.Link>

            <Nav.Link onClick={() => setSelectedCourses('WORKSHOPY')} as={Link} href="/workshopy" to="/workshopy" className="navihover   pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
                WORKSHOPY
            </Nav.Link>

            <Nav.Link onClick={() => setSelectedCourses('LEKTORI')} as={Link} href="/lektori" to="/lektori" className="navihover   pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
                LEKTORI
            </Nav.Link>
          </NavDropdown>

          <NavDropdown title={<span style={{color: '#333333'}}>{selectedPricing}</span>} id="basic-nav-dropdown" className="navihover">
            <Nav.Link onClick={() => setSelectedPricing('CENY')} as={Link} href="/ceny" to="/ceny" className="navihover   pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
                CENY
            </Nav.Link>

            <Nav.Link onClick={() => setSelectedPricing('CENNÍK PRENÁJMU')} as={Link} href="/cennikprenajmu" to="/cennikprenajmu" className="navihover  pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
              CENNÍK PRENÁJMU
            </Nav.Link>
          </NavDropdown>


          <Nav.Link as={Link} href="/galeria" to="/galeria" className="navihover   pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
              GALÉRIA
          </Nav.Link>

          <Nav.Link as={Link} href="/kontakt" to="/kontakt" className="navihover   pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
              KONTAKT
          </Nav.Link>

          <Nav.Link as={Link} href="/online-kurzy" to="/online-kurzy" className="navihover   pt-4 pb-3 mr-xl-2 ml-xl-2 mr-lg-1 ml-lg-1 ">
              ONLINE KURZY
          </Nav.Link>
        </Nav>
        <Nav style={{position: "absolute", right: 16, top: 16}}>
            <Nav.Link as={Link} href="/kosik" to="/kosik" className="navihover  pt-3 pb-3 ">
                <FiShoppingCart />
            </Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} href="/objednavky" to="/objednavky" className="navihover  pt-3 pb-3 ">
                OBJEDNÁVKY
              </Nav.Link>
              <Nav.Link as={Link} href="/moje-videa" to="/moje-videa" className="navihover  pt-3 pb-3 ">
                MOJE VIDEÁ
              </Nav.Link>
              <Nav.Link as={Link} href="" to="" onClick={() => handleLogOut()} className="navihover  pt-3 pb-3 ">
                ODHLÁSIŤ
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} href="/login-page" to="/login-page" className="navihover pt-3 pb-3 ">
                PRIHLÁSIŤ
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
};
