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
export default ({ userData, category }) => {
  const [pageName, setPageName] = useState("");
  const [description, setDescription] = useState("");

  const owner = userData.fullName;

  const handleOpenShop = () => {
    axios
      .post(`http://localhost:5000/page/add`, {
        pageName,
        owner,
        description,
        url: shortid.generate(),
        category
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
              <h1>Pridať novú stránku</h1>
              <p>
                Vyplň základné informácie a zvyšok nastavíš v novovytvorenej stránke.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6} className="form-group">
              <label htmlFor="pageName">Názov:</label>
              <input
                value={pageName}
                className="form-control"
                type="text"
                name="pageName"
                onChange={(e) => setPageName(e.target.value)}
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
              {description && pageName ? 
              <Button variant="dark" onClick={handleOpenShop}>
                Hotovo
              </Button> :
              <Button variant="dark" disabled>
                Hotovo
              </Button>
              }
            </Col>
          </Row>
        </Container>
        <hr />
      </div>
    </SlideDown>
  );
};
