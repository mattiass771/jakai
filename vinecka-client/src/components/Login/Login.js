import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import SignUp from "./SignUp";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

// Login.js
export default ({shoppingCart = false}) => {
  const [signUp, setSignUp] = useState("display-none");
  const [hideButton, setHideButton] = useState("");

  const showSignUp = () => {
    setSignUp("");
    setHideButton("display-none");
  };

  return (
    <Container>
        <SlideDown className={"my-dropdown-slidedown"}>
        <br />
        <Row>
          <Col className="text-center">
            <h2>Prihláste sa!</h2>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center mt-1">
            <form action={shoppingCart ? 'https://mas-vino.herokuapp.com/login?shopping=cart' : 'https://mas-vino.herokuapp.com/login'} method="post">
              <input
                className="form-control text-center"
                type="text"
                placeholder="e-mail"
                name="username"
              />
              <br />
              <input
                className="form-control text-center"
                type="password"
                placeholder="heslo"
                name="password"
              />
              <br />
              <input
                className="btn btn-dark"
                id="sub"
                type="submit"
                value="Prihlásiť!"
              ></input>
            </form>
          </Col>
        </Row>
        <hr />
        {!shoppingCart &&
        <>
          <div className={`${hideButton}`}>
            <Row className={`justify-content-md-center`}>
              <Col md={6} className="text-center mt-1">
                <Button onClick={showSignUp} variant="dark">
                  Ešte nemám prihlásenie.
                </Button>
              </Col>
            </Row>
          </div>
          <div className={`${signUp}`}>
            <SignUp />
          </div>
        </>}
      </SlideDown>
    </Container>
  );
};
