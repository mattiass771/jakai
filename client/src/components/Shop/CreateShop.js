import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import shortid from 'shortid';

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

// CreateShop.js
export default ({ userData }) => {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");

  const owner = userData.fullName;
  const ownerId = userData._id;

  const handleOpenShop = () => {
    console.log(owner, shopName, ownerId, description, shortid.generate())
    axios
      .post(`http://localhost:5000/shop/add`, {
        shopName,
        owner,
        ownerId,
        description,
        url: shortid.generate()
      })
      .then((res) => console.log(res.data))
      .catch((err) => err && console.log(`Error catched: ${err}`))
      .then(() => window.location.reload());
  };

  return (
    <SlideDown className={"my-dropdown-slidedown"}>
      <div className="whitesmoke-bg-pnine">
        <Container>
          <br />
          <Row>
            <Col className="text-center">
              <h1>Pridať novú lekciu/kurz</h1>
              <p>
                Vyplň základné informácie a zvyšok nastavíš v novovytvorenom kurze.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6} className="form-group">
              <label htmlFor="shopName">Názov:</label>
              <input
                value={shopName}
                className="form-control"
                type="text"
                name="shopName"
                onChange={(e) => setShopName(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6} className="form-group">
              <label htmlFor="setDescription">
                Základný popis:
              </label>
              <textarea
                value={description}
                className="form-control"
                type="text"
                name="setDescription"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6} className="text-center">
              <Button variant="dark" onClick={handleOpenShop}>
                Hotovo
              </Button>
            </Col>
          </Row>
        </Container>
        <hr />
      </div>
    </SlideDown>
  );
};
