import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

// Login.js
export default ({regSuccess, setRegSuccess, uncheckGdpr, setUncheckGdpr, shoppingCart = false, newUser, setNewUser, setUserInformation, userInformation}) => {
  const [passwordFirst, setPasswordFirst] = useState("");
  const [passwordSecond, setPasswordSecond] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [emailExists, setEmailExists] = useState(null);

  const [firstName, setFirstName] = useState(sessionStorage.getItem("firstName") || "");
  const [lastName, setLastName] = useState(sessionStorage.getItem("lastName") || "");
  const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
  const [phone, setPhone] = useState(sessionStorage.getItem("phone") || "")

  const [street, setStreet] = useState(sessionStorage.getItem("street") || "")
  const [postal, setPostal] = useState(sessionStorage.getItem("postal") || "")
  const [city, setCity] = useState(sessionStorage.getItem("city") || "")
  
  const [checkedGdpr, setCheckedGdpr] = useState(false)
  const [checkedNewsletter, setCheckedNewsletter] = useState(false)

  useEffect(() => {
    if (uncheckGdpr) {
      setCheckedGdpr(false)
      setUncheckGdpr(false)
    }
  }, [uncheckGdpr])  

  const handleSignUp = () => {
    const fullName = firstName.trim() + " " + lastName.trim();
    const address = `${street.trim()},${postal.toString()},${city.trim()}`
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/add-user`, {
        userName: email,
        password: passwordSecond,
        fullName: fullName,
        email: email,
        phone: phone,
        address: address
      })
      .then((res) => {
        if (shoppingCart && !regSuccess) setRegSuccess(true)
        if (checkedNewsletter) {
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/mails/add`, {name: firstName, email})
              .then(res => console.log(res))
              .catch(err => err && console.log(err))
        }
      })
      .catch((err) => err && console.log(`Error: ${err}`))
      .then(() => shoppingCart ? null : window.location.reload());
  };

  useEffect(() => {
    if(newUser) {
      handleSignUp()
      setNewUser(false)
    }
  }, [newUser])

  useEffect(() => {
    if (shoppingCart) {
      if (
        checkIfEmailMeetsCriteria() === "" &&
        checkIfNameMeetsCriteria(firstName) === "" &&
        checkIfNameMeetsCriteria(lastName) === "" &&
        checkIfPasswordMeetsCriteria() &&
        checkIfPhoneMeetsCriteria() === "" &&
        checkIfStreetMeetsCriteria() === "" &&
        checkIfPostalMeetsCriteria() === "" &&
        checkIfCityMeetsCriteria() === "" &&
        passwordsMatch &&
        checkedGdpr &&
        emailExists === null
      ) {
        const fullName = firstName.trim() + " " + lastName.trim();
        const address = `${street.trim()},${postal.toString()},${city.trim()}`
        setUserInformation({ fullName, email, phone, address })
      } else {
        setUserInformation('')
      }
    }
  }, [firstName, lastName, email, street, city, postal, phone, checkedGdpr, passwordsMatch, emailExists])

  const checkIfPasswordMeetsCriteria = () => {
    if (
      passwordFirst.search(/[0-9]/) !== -1 &&
      passwordFirst.search(/[a-z]/) !== -1 &&
      passwordFirst.search(/[A-Z]/) !== -1 &&
      passwordFirst &&
      passwordFirst.length > 7
    )
      return true;
    else return false;
  };

  const checkIfEmailInDatabase = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/email/${email}`)
      .then((res) => setEmailExists(res.data))
      .catch((err) => err && console.log(`Error: ${err}`));
  };

  const checkIfEmailMeetsCriteria = () => {
    if (
      email &&
      emailExists === null &&
      email.match(/[a-z0-9]+[.]?[a-z0-9]*[@][a-z0-9]+[.][a-z]{1,5}/gi)
    )
      return "";
    else if (email && email.length > 0) return "invalid-input";
  };

  const checkIfNameMeetsCriteria = (name) => {
    if (name && name.match(/^[a-z??-?? ]+$/i)) return "";
    else if (name && name.length > 0) return "invalid-input";
  };

  const checkIfCityMeetsCriteria = () => {
    if (city && city.match(/^[a-z??-?? ]+$/i)) return "";
    else if (city && city.length > 0) return "invalid-input";
  };

  const checkIfStreetMeetsCriteria = () => {
    if (street && street.match(/^[a-z??-?? ]+[0-9]{1}[0-9 ]*[/]{0,1}[a-z0-9]*$/i)) return "";
    else if (street && street.length > 0) return "invalid-input";
  };

  const checkIfPhoneMeetsCriteria = () => {
    if (phone && phone.match(/^[+]?[0-9 ]{6,14}[0-9]$/)) return "";
    else if (phone && phone.length > 0) return "invalid-input";
  };

  const checkIfPostalMeetsCriteria = () => {
    if (postal && postal.match(/^[0-9 ]{5}$/)) return "";
    else if (postal && postal.length > 0) return "invalid-input";
  };

  useEffect(() => {
    if (passwordFirst && passwordSecond && passwordFirst === passwordSecond) setPasswordsMatch(true);
    else setPasswordsMatch(false);
  }, [passwordSecond]); //eslint-disable-line

  useEffect(() => {
    if (email) {
      checkIfEmailInDatabase()
    }
  }, [email])

  const handleSessionStorage = (customKey, value) => {
    return sessionStorage.setItem(customKey, value)
  }

  return (
      <Container>
        <br />
        {!shoppingCart &&
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center mt-1">
            <h2>Registrujte sa!</h2>
          </Col>
        </Row>}
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
              onBlur={() => handleSessionStorage('firstName', firstName)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
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
              onBlur={() => handleSessionStorage('lastName', lastName)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
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
              onBlur={() => handleSessionStorage('email', email)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
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
                onBlur={() => handleSessionStorage('phone', phone)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="street">Ulica a ????slo domu:</label>
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
              onBlur={() => handleSessionStorage('street', street)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="postal">PS??:</label>
            <input
              className={`form-control text-center ${checkIfPostalMeetsCriteria()}`}
              type="text"
              name="postal"
              value={postal}
              onChange={(e) => setPostal(e.target.value && (e.target.value).substring(0,5))}
              onBlur={() => handleSessionStorage('postal', postal)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
            />
          </Col>
          <Col md={6} className={`text-center mt-1`}>
            <label htmlFor="city">Mesto:</label>
            <input
              className={`form-control text-center ${checkIfCityMeetsCriteria()}`}
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(
                e.target.value &&
                e.target.value[0].toUpperCase() +
                e.target.value.substring(1)
              )}
              onBlur={() => handleSessionStorage('city', city)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
            />
          </Col>
          <Col md={6} className="text-center mt-1">
            <label htmlFor="passwordFirst">Nov?? heslo:</label>
            <input
              className={`form-control text-center ${
                !checkIfPasswordMeetsCriteria() && passwordFirst.length > 0
                  ? "invalid-input"
                  : ""
              }`}
              type="password"
              name="passwordFirst"
              value={passwordFirst}
              onChange={(e) => setPasswordFirst(e.target.value)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
            />
          </Col>
          <Col md={6} className="text-center mt-1">
            <label htmlFor="passwordSecond">Zopakova?? heslo:</label>
            <input
              className="form-control text-center"
              type="password"
              name="passwordSecond"
              value={passwordSecond}
              onChange={(e) => setPasswordSecond(e.target.value)}
              readOnly={typeof userInformation === 'object'}
              placeholder="povinn??"
            />
          </Col>
        </Row>
                <Row className="justify-content-center mt-2">
                    <Col md={10}>
                    <em style={{float: 'left', color: (!checkedGdpr && firstName && lastName && email && phone && street && postal && city) ? '#7b1818' : ''}}>
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
                        S??hlas??m so spracov??van??m osobn??ch ??dajov (v zmysle Z??kona ??. 18/2018 Z.z. o ochrane osobn??ch ??dajov a o zmene a doplnen?? niektor??ch z??konov a z??kona ??. 245/2008 Z.z. o v??chove a vzdel??van?? v znen?? neskor????ch zmien a predpisov)</em>
                    </Col>
                </Row>
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
                        Chcem odobera?? newsletter a t??mto s??hlas??m s odoberan??m newslettra eshopu masvino.sk. Tento s??hlas m????ete odvola??, napr??klad <Link to="/odhlasit-newsletter">tu</Link>, alebo na konci ka??d??ho newsletter emailu.</em>
                    </Col>
                </Row>

        {checkIfPasswordMeetsCriteria() ? null : (
          <Row className="justify-content-md-center">
            <Col md={6} className="text-center mt-3">
              <em style={{ color: "#7b1818" }}>
                Heslo mus?? ma?? 8 znakov a mus?? pozost??va?? z najmenej jedn??ho ve??k??ho, mal??ho p??smena a mus?? obsahova?? minim??lne jednu ????slicu.
              </em>
            </Col>
          </Row>
        )}

        <Row className="justify-content-md-center">
          <Col md={6} className="text-center mt-3">
            {emailExists && (
              <>
                <em style={{ color: "#7b1818" }}>
                  Tento e-mail u?? existuje v na??om syst??me.
                </em>
                <br />
                <br />
              </>
            )}
            {checkIfPasswordMeetsCriteria() && !passwordsMatch && (
              <>
                <em style={{ color: "#7b1818" }}>Hesl?? musia by?? rovnak??!</em>
              </>
            )}
          </Col>
        </Row>
        {!shoppingCart &&
        <Row className="justify-content-md-center">
          <Col md={6} className="text-center mt-3">
            {checkIfEmailMeetsCriteria() === "" &&
            checkIfNameMeetsCriteria(firstName) === "" &&
            checkIfNameMeetsCriteria(lastName) === "" &&
            checkIfPasswordMeetsCriteria() &&
            checkIfPhoneMeetsCriteria() === "" &&
            checkIfStreetMeetsCriteria() === "" &&
            checkIfPostalMeetsCriteria() === "" &&
            checkIfCityMeetsCriteria() === "" &&
            passwordsMatch &&
            checkedGdpr &&
            emailExists === null ? (
              <Button onClick={handleSignUp} variant="dark">
                Registrova?? sa!
              </Button>
            ) : (
              <Button disabled variant="dark">
                Registrova?? sa!
              </Button>
            )}
          </Col>
        </Row>}
      </Container>
  );
};
