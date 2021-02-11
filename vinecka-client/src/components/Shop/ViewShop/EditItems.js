import React, { useState, useEffect } from "react";
import axios from "axios";

import Dropzone from "react-dropzone-uploader";
import { BsUpload } from "react-icons/bs";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup"


import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

export default ({ showEditItems, setShowEditItems, shopId, itemId, itemDataProp, setShouldReload, shouldReload }) => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [canSaveItem, setCanSaveItem] = useState(false);
  const [maxCount, setMaxCount] = useState('')

  const [itemData, setItemData] = useState({...itemDataProp})

  const resetPropsOnHide = () => {
    setImageLink("")
    setItemName("")
    setPrice("")
    setDescription("")
    setCanSaveItem(false)
    setShowEditItems('')
  }

  const getImage = (image) => {
    try {
      const img = require(`../../../../../src/uploads/${image}`);
      return img;
    } catch {
      return null;
    }
  };

  const handleSaveItem = () => {
    if (itemName) {
      axios
        .put(`http://localhost:5000/shop/${shopId}/update-item/${itemId}/itemName/${itemName}`, {})
        .then(() => {
          setShowEditItems('')
          setShouldReload(!shouldReload)
        })
        .catch((err) => err && console.log(err));
    }
    if (price) {
      axios
        .put(`http://localhost:5000/shop/${shopId}/update-item/${itemId}/price/${price}`, {})
        .then(() => {
          setShowEditItems('')
          setShouldReload(!shouldReload)
        })
        .catch((err) => err && console.log(err));
    }
    if (description) {
      axios
        .put(`http://localhost:5000/shop/${shopId}/update-item/${itemId}/description/${description}`, {})
        .then(() => {
          setShowEditItems('')
          setShouldReload(!shouldReload)
        })
        .catch((err) => err && console.log(err));
    }
    if (imageLink) {
      axios
        .put(`http://localhost:5000/shop/${shopId}/update-item/${itemId}/imageLink/${imageLink}`, {})
        .then(() => {
          setShowEditItems('')
          setShouldReload(!shouldReload)
        })
        .catch((err) => err && console.log(err));
    }
    if (maxCount) {
      axios
        .put(`http://localhost:5000/shop/${shopId}/update-item/${itemId}/maxCount/${maxCount}`, {})
        .then(() => {
          setShowEditItems('')
          setShouldReload(!shouldReload)
        })
        .catch((err) => err && console.log(err));
    }
  };

  const deleteFile = (file) => {
    axios
      .get(`http://localhost:5000/deleteFile/${shopId}`, {
        params: file
      })
      .then(() => 
        {return}
      )
      .catch((err) => err && console.log(err));
  };
  useEffect(() => {
    const isAlready = getImage(imageLink) ? getImage(imageLink) : imageLink;
    if (isAlready || imageLink || description || price || itemName) {
      setCanSaveItem(true);
    }
  }, [imageLink, description, price, itemName]);

  const getUploadParams = ({ meta }) => {
    return { url: `http://localhost:5000/fileUpload/${shopId}` };
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "removed") {
      deleteFile(meta);
    }
    if (status === "done") {
      setImageLink(`${shopId}-${meta.name}`);
    }
  };

  const deleteFormerImage = () => {
    const newItemData = {...itemData, imageLink: ''}
    setItemData(newItemData)
  }

  return (
    <Modal show={showEditItems} onHide={() => resetPropsOnHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Add an item to your shop.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-md-center">
          <Col className="form-group">
            <label htmlFor="shopName">Name your item:</label>
            <input
              value={itemName || itemData.itemName}
              className="form-control"
              type="text"
              name="shopName"
              onChange={(e) => setItemName(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              value={price || itemData.price}
              className="form-control"
              type="text"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <label htmlFor="sizes">Maximalny pocet flias v jednej objednavke:</label>
          </Col>
        </Row>
        <Row>
          <Col className="form-group">
          <InputGroup>
              <input
                value={maxCount || itemData.maxCount || ''}
                className="form-control"
                type="number"
                name="sizes"
                onChange={(e) => setMaxCount(e.target.value)}
                placeholder={'Nechaj prazdne ak nieje hranica'}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              maxLength="230"
              value={description || itemData.description}
              className="form-control"
              name="description"
              type="text"
              style={{ resize: "none", minHeight: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
        <br />
        <SlideDown className={"my-dropdown-slidedown"}>
        {itemData.imageLink ? 
        <Row className="justify-content-center text-center">
          <Col className="form-group">
            <img style={{height:'110px', width: '80px'}} src={getImage(itemData.imageLink) ? getImage(itemData.imageLink) : itemData.imageLink} />
            <Button onClick={() => deleteFormerImage()} variant="dark" size="sm" >Vymazat obrazok</Button>
          </Col>
        </Row> :
        <Row>
          <Col>
            <Dropzone
              maxFiles={1}
              multiple={false}
              canCancel={false}
              getUploadParams={getUploadParams}
              onChangeStatus={handleChangeStatus}
              accept="image/*"
              inputContent={() => (
                <p
                  className="text-center"
                  key="label"
                  style={{ marginTop: "15px", color: "#333333" }}
                >
                  Drop or click to choose image.
                  <br />
                  <BsUpload />
                </p>
              )}
              classNames={{
                dropzone: "dropzoning"
              }}
            />
          </Col>
        </Row>}
      </SlideDown>
      </Modal.Body>
      <Modal.Footer>
        {canSaveItem ? (
          <Button variant="dark" onClick={handleSaveItem}>
            Save Item
          </Button>
        ) : (
          <Button disabled variant="dark">
            Save Item
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};