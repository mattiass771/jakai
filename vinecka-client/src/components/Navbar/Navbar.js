import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import logo from "./logojakai.png"

import {FiShoppingCart} from "react-icons/fi"

// Navbar.js
export default ({ isLoggedIn, handleLogOut, userName }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0); 
  const [visible, setVisible] = useState(true);

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
    backgroundColor: '#AE1865',
    fontSize: '120%'
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
    <Navbar collapseOnSelect className="justify-content-center" style={{...navbarStyles, top: visible ? '0' : '-169px', paddingTop: '100px'}} variant="dark" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="row justify-content-center text-center">
        <Nav className="my-4 my-md-0">
          <Nav.Link as={Link} href="/" to="/" className="navihover pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
              Domov
          </Nav.Link>

          <Nav.Link as={Link} href="/lekciekurzy" to="/lekciekurzy" className="navihover  pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
              Lekcie a Kurzy
          </Nav.Link>

          <Nav.Link as={Link} href="/workshopy" to="/workshopy" className="navihover  pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
               Workshopy
          </Nav.Link>

          <Nav.Link as={Link} href="/lektori" to="/lektori" className="navihover  pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
              Lektori
          </Nav.Link>

          <Nav.Link as={Link} href="/ceny" to="/ceny" className="navihover  pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
              Ceny
          </Nav.Link>

          <Nav.Link as={Link} href="/cennikprenajmu" to="/cennikprenajmu" className="navihover  pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
              Cenník prenájmu
          </Nav.Link>

          <Nav.Link as={Link} href="/galeria" to="/galeria" className="navihover  pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
              Galéria
          </Nav.Link>

          <Nav.Link as={Link} href="/kontakt" to="/kontakt" className="navihover  pt-4 pb-3 mr-xl-4 ml-xl-4 mr-lg-2 ml-lg-2 mr-1 ml-1">
              Kontakt
          </Nav.Link>
        </Nav>
        <Nav style={{position: "absolute", right: 16, top: 16}}>
            <Nav.Link as={Link} href="/cart-page" to="/cart-page" className="navihover  pt-3 pb-3 mr-1 ml-1">
                <FiShoppingCart />
            </Nav.Link>
          {isLoggedIn ? (
            <>
              <Nav.Link as={Link} href="/objednavky" to="/objednavky" className="navihover  pt-3 pb-3 mr-1 ml-1">
                  Objednávky
              </Nav.Link>
              <Nav.Link as={Link} href="" to="" onClick={() => handleLogOut()} className="navihover  pt-3 pb-3 mr-1 ml-1">
                Odhlásiť
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} href="/login-page" to="/login-page" className="navihover pt-3 pb-3 mr-1 ml-1">
                Prihlásiť
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
};
