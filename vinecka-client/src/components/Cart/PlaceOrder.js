import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

// Login.js
export default ({setUserInformation}) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")

  const [street, setStreet] = useState("")
  const [postal, setPostal] = useState("")
  const [city, setCity] = useState("")

  const handleSignUp = () => {
    const fullName = middleName
      ? firstName + " " + middleName + " " + lastName
      : firstName + " " + lastName;
    const address = `${street},${postal.toString()},${city}`
    return setUserInformation({ fullName, email, phone, address })
  };

  useEffect(() => {
    console.log('check')
    if (
      checkIfEmailMeetsCriteria() === "" &&
      checkIfNameMeetsCriteria(firstName) === "" &&
      checkIfNameMeetsCriteria(lastName) === "" &&
      checkIfPhoneMeetsCriteria() === "" &&
      checkIfStreetMeetsCriteria() === "" &&
      checkIfPostalMeetsCriteria() === "" &&
      checkIfCityMeetsCriteria() === ""
    ) {
      handleSignUp()
    } else {
      setUserInformation('')
    }
  }, [firstName, lastName, email, street, city, postal, phone])

  const checkIfEmailMeetsCriteria = () => {
    if (
      email &&
      email.match(/[a-z]+[.]?[a-z]*[@][a-z]+[.][a-z]{1,5}/gi)
    )
      return "";
    else if (email && email.length > 0) return "invalid-input";
  };

  const checkIfNameMeetsCriteria = (name) => {
    if (name && name.match(/^[a-z]+$/i)) return "";
    else if (name && name.length > 0) return "invalid-input";
  };

  const checkIfCityMeetsCriteria = () => {
    if (city && city.match(/^[a-z]+$/i)) return "";
    else if (city && city.length > 0) return "invalid-input";
  };

  const checkIfStreetMeetsCriteria = () => {
    if (street && street.match(/^[a-z ]+[0-9 ]+[/]{0,1}[a-z0-9 ]*$/i)) return "";
    else if (street && street.length > 0) return "invalid-input";
  };

  const checkIfPhoneMeetsCriteria = () => {
    if (phone && phone.match(/^[+]?[0-9]{6,14}[0-9]$/)) return "";
    else if (phone && phone.length > 0) return "invalid-input";
  };

  const checkIfPostalMeetsCriteria = () => {
    if (postal && postal.match(/^[0-9]{5}$/)) return "";
    else if (postal && postal.length > 0) return "invalid-input";
  };

  return (
    <SlideDown className={"my-dropdown-slidedown"}>
      <Container>
        <br />
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center mt-1">
            <label htmlFor="firstName">Meno:</label>
            <input
              className={`form-control text-center ${checkIfNameMeetsCriteria(
                firstName
              )}`}
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value &&
                    e.target.value[0].toUpperCase() +
                      e.target.value.substring(1)
                )
              }
            />
          </Col>
          <Col md={6} className="text-center mt-1">
            <label htmlFor="middleName">Stredné meno (voliteľné):</label>
            <input
              className={`form-control text-center ${checkIfNameMeetsCriteria(
                middleName
              )}`}
              type="text"
              name="middleName"
              value={middleName}
              onChange={(e) =>
                setMiddleName(
                  e.target.value &&
                    e.target.value[0].toUpperCase() +
                      e.target.value.substring(1)
                )
              }
            />
          </Col>
          <Col md={6} className="text-center mt-1">
            <label htmlFor="lastName">Priezvisko:</label>
            <input
              className={`form-control text-center ${checkIfNameMeetsCriteria(
                lastName
              )}`}
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value &&
                  e.target.value[0].toUpperCase() +
                  e.target.value.substring(1)
                )
              }
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="email">E-mail:</label>
            <input
              className={`form-control text-center ${checkIfEmailMeetsCriteria()}`}
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="phone">Telefon:</label>
            <input
              className={`form-control text-center ${checkIfPhoneMeetsCriteria()}`}
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value &&
                (e.target.value).substring(0,16)
                )}
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="street">Ulica a cislo domu:</label>
            <input
              className={`form-control text-center ${checkIfStreetMeetsCriteria()}`}
              type="text"
              name="street"
              value={street}
              onChange={(e) => setStreet(
                e.target.value &&
                e.target.value[0].toUpperCase() +
                e.target.value.substring(1)
              )}
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="postal">PSČ:</label>
            <input
              className={`form-control text-center ${checkIfPostalMeetsCriteria()}`}
              type="text"
              name="postal"
              value={postal}
              onChange={(e) => setPostal(e.target.value && (e.target.value).substring(0,5))}
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="city">Mesto:</label>
            <input
              className={`form-control text-center ${checkIfCityMeetsCriteria()}`}
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center mt-3">
            
          </Col>
        </Row>
      </Container>
    </SlideDown>
  );
};
