import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"

import Dropzone from "react-dropzone-uploader";

import { BsUpload } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import defaultImage from "../../../default.jpg";

import options from '../../../config/options';

// CreateShop.js
export default ({ pageData, isOwner }) => {
  let history = useHistory();
  const url = pageData.url;
  const [currentUrl, setCurrentUrl] = useState(url)
  const [newUrl, setNewUrl] = useState(url)
  const [isUrlAvailible, setIsUrlAvailible] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [pageName, setPageName] = useState(pageData.pageName)
  const [error, setError] = useState('')
  const [description, setDescription] = useState(pageData.description)
  const [owner, setOwner] = useState(pageData.owner)
  const [imageLink, setImageLink] = useState('');
  const [overviewImage, setOverviewImage] = useState('');
  const [showImageFromDb, setShowImageFromDb] = useState(pageData.imageLink ? pageData.imageLink : '')
  const [localUploadingTitle, setLocalUploadingTitle] = useState(false)
  const [localUploadingOverview, setLocalUploadingOverview] = useState(false)
  const [textColor, setTextColor] = useState(pageData.textColor)

  useEffect(() => {
    if (textColor !== pageData.textColor) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/textColor/${textColor}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    } 
  }, [textColor])

  const getImage = (image) => {
    try {
      const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
      return img;
    } catch {
      return null;
    }
  };

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: `http://localhost:5000/fileUpload/${pageData._id}` };
  };

  const deleteFile = (file) => {
    axios
      .get(`http://localhost:5000/deleteFile/${pageData._id}`, {
        params: file
      })
      .then(() => 
        {return}
      )
      .catch((err) => err && console.log(err));
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    if (status === "removed") {
      deleteFile(meta);
    }
    if (status === "done") {
      if (localUploadingTitle) {
        setImageLink(`${pageData._id}-${meta.name.replace(/_/g,'-')}`);
      } else if (localUploadingOverview) {
        setOverviewImage(`${pageData._id}-${meta.name.replace(/_/g,'-')}`);
      }
    }
  };

  const deleteCard = (e) => {
    axios
        .delete(
        `http://localhost:5000/page/${pageData._id}`
        )
        .then(() => history.push(`/vinarne`))
        .catch((err) => err && console.log(`Error ${err}`));
  };

  useEffect(() => {
    if (imageLink) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/imageLink/${imageLink}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    } 
  }, [imageLink])

  useEffect(() => {
    if (overviewImage) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/overviewImage/${overviewImage}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    } 
  }, [overviewImage])

  useEffect(() => {
    axios
      .get(`http://localhost:5000/page/link/${currentUrl}`)
      .then((res) => {
        if (res.data && currentUrl !== newUrl) setIsUrlAvailible(false)
        else setIsUrlAvailible(true)
      })
      .catch((err) => err && console.log(err))
  }, [currentUrl])

  const handleError = (error) => {
    console.log('Error connecting to the database: ', error)
    setError('Chyba pri aktualizacii dat, data neboli upravene v databaze.')
    return setTimeout(() => setError(''), 5000)
  }

  const handleUrlChange = () => {
    if (isUrlAvailible) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/url/${currentUrl}`
      )
      .then((res) => {
        return setNewUrl(currentUrl);
      })
      .catch((err) => err && handleError(err))
      .then(() => history.push(`/${currentUrl}`))
    }
  }

  const handleShopNameChange = () => {
    if (pageName) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/pageName/${pageName}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    }
  }

  const handleDescriptionChange = () => {
    if (description) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/description/${description}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    }
  }

  const handleOwnerChange = () => {
    if (owner) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/owner/${owner}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    }
  }

  const handleLocalUploadingOverview = () => {
    setLocalUploadingTitle(false)
    setLocalUploadingOverview(true)
  }

  const handleLocalUploadingTitle = () => {
    setLocalUploadingOverview(false)
    setLocalUploadingTitle(true)
  }

  return (
    <Jumbotron style={{
                      color: textColor === 'white' ? 'whitesmoke' : '#333333', 
                      fontSize: '120%',
                      background: `url(${showImageFromDb ? getImage(showImageFromDb) : defaultImage}) center center no-repeat`, 
                      backgroundSize: 'cover'                  
                      }} fluid>
                        
    <Container className="text-center">
      {!editMode ?
        <Row style={{padding: '15px', backgroundColor: textColor === 'white' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.25)', borderRadius: '7.5px'}}>
          <Col>
            <h2>{pageName}</h2>
            <p>{description}</p>
            <p>{owner}</p>
          </Col>
        </Row>
        :
        <>
          <Row className="justify-content-md-center pb-2">
            <Col className="text-center">
              <Button variant={`${textColor === 'white' ? 'light' : 'dark'}`} onClick={() => setTextColor('white')} >Biely text</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant={`${textColor === 'white' ? 'dark' : 'light'}`} onClick={() => setTextColor('black')} >Cierny text</Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Button
              onClick={(e) => deleteCard(e)}
              style={{
                width: "40px",
                height: "40px",
                marginBottom: "-40px",
                zIndex: "+5"
              }}
              variant="outline-danger"
            >
              <MdDelete style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
            </Button>
            <Col xs={8}>
              <input 
                className={'form-control text-center'}
                value={pageName} 
                onChange={(e) => setPageName(e.target.value)} 
                onBlur={handleShopNameChange}
                name="pageName"
                placeholder="Nazov"
              />
              <textarea 
                style={{minHeight: '100px'}}
                className={'form-control text-center'}
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                onBlur={handleDescriptionChange}
                name="description"
                placeholder="Popis"
              />
              <input 
                className={'form-control text-center'}
                value={owner} 
                onChange={(e) => setOwner(e.target.value)} 
                onBlur={handleOwnerChange}
                name="owner"
                placeholder="Majitel"
              />
              <div>
                <InputGroup>
              <p style={{marginRight: 10, marginTop: 5}}>www.jakai.sk/</p>
                  <input 
                    className={isUrlAvailible ? 'form-control text-center' : 'text-center form-control invalid-input'}
                    value={currentUrl} 
                    onChange={(e) => setCurrentUrl(e.target.value)} 
                    name="currentUrl"
                    onBlur={handleUrlChange}
                  />
                </InputGroup>
                {!isUrlAvailible && <p style={{color: "red"}}>Adresa uz existuje, vyberte prosim inu.</p>}
              </div>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col className="text-center">
              <Button variant="dark" onClick={() => handleLocalUploadingTitle()}>Upload title image</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="dark" onClick={() => handleLocalUploadingOverview()}>Upload overview image</Button>
            </Col>
          </Row>
        </>
        }
        {((localUploadingTitle || localUploadingOverview) && editMode) ? 
        <SlideDown className={"my-dropdown-slidedown"}>
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
                  Drop or click to choose {localUploadingTitle ? 'title' : 'overview'} image.
                  <br />
                  <BsUpload />
                </p>
              )}
              classNames={{
                dropzone: "dropzoning"
              }}
            />
          </Col>
        </Row></SlideDown> : null
        }
        {isOwner &&
        <Row className="mt-4">
          <Col>
            <Alert style={{display: `${error ? 'block' : 'none'}`}} variant="danger">{error}</Alert>
            {isUrlAvailible ? 
            <Button onClick={() => setEditMode(editMode ? false : true)} variant="dark">{editMode ? 'Hotovo' : 'Upravit'}</Button> :
            <Button disabled variant="dark">{editMode ? 'Hotovo' : 'Upravit'}</Button>}
          </Col>
        </Row>}
      </Container>
    </Jumbotron>
  );
};