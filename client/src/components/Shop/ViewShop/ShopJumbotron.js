import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import Image from "react-bootstrap/Image"

import Dropzone from "react-dropzone-uploader";

import { BsUpload } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig } from '../../../config/options'

import RozvrhModal from '../../Rozvrh/RozvrhModal'

// CreateShop.js
export default ({ pageData, isOwner }) => {
  let history = useHistory();
  const url = pageData.url;
  const [currentUrl, setCurrentUrl] = useState(url)
  const [newUrl, setNewUrl] = useState(url)
  const [isUrlAvailible, setIsUrlAvailible] = useState(true)
  const [showRozvrhPopup, setShowRozvrhPopup] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [pageName, setPageName] = useState(pageData.pageName)
  const [rozvrhLink, setRozvrhLink] = useState(pageData.rozvrhLink)
  const [error, setError] = useState('')
  const [description, setDescription] = useState(pageData.description)
  const [owner, setOwner] = useState(pageData.owner)
  const [category, setCategory] = useState(pageData.category)
  const [imageLink, setImageLink] = useState('');
  const [overviewImage, setOverviewImage] = useState('');
  const [localUploadingTitle, setLocalUploadingTitle] = useState(false)
  const [localUploadingOverview, setLocalUploadingOverview] = useState(false)
  const [localUploadingLogoImage, setLocalUploadingLogoImage] = useState(false)
  const [logoImage, setLogoImage] = useState(pageData.logoImage)
  
  ClassicEditor.defaultConfig = editorConfig

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
      } else if (localUploadingLogoImage) {
        setLogoImage(`${pageData._id}-${meta.name.replace(/_/g,'-')}`);
      }
    }
  };

  const deleteCard = (e) => {
    axios
        .delete(
        `http://localhost:5000/page/${pageData._id}`
        )
        .then(() => history.push(`/lekciekurzy`))
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
    if (logoImage) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/logoImage/${logoImage}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    } 
  }, [logoImage])

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

  const handleRozvrhLinkChange = () => {
    if (rozvrhLink) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-rozvrh-link/`, {rozvrhLink}
      )
      .then((res) => {
        return;;
      })
      .catch((err) => err && handleError(err))
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

  const handleCategoryChange = () => {
    if (category) {
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page/category/${category}`
      )
      .then((res) => {
        return;
      })
      .catch((err) => err && handleError(err));
    }
  }

  const handleDescriptionChange = () => {
    if (description) {
      console.log('hit', typeof description)
      axios
      .put(
        `http://localhost:5000/page/${pageData._id}/update-page-description/`,{description}
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
    setLocalUploadingLogoImage(false)
    setLocalUploadingOverview(true)
  }

  const handleLocalUploadingTitle = () => {
    setLocalUploadingOverview(false)
    setLocalUploadingLogoImage(false)
    setLocalUploadingTitle(true)
  }

  const handleLocalUploadingLogoImage = () => {
    setLocalUploadingOverview(false)
    setLocalUploadingTitle(false)
    setLocalUploadingLogoImage(true)
  }

  console.log(logoImage)

  return (
    <>
    <RozvrhModal showRozvrhPopup={showRozvrhPopup} setShowRozvrhPopup={setShowRozvrhPopup} rozvrhLink={rozvrhLink} />
    <Jumbotron style={{
                      color: '#333333', 
                      fontSize: '120%',
                      background: `rgba(245,245,245,0.5)`, 
                      padding: '40px 60px'            
                      }} fluid>
      {!editMode ?
        <Row style={{padding: '15px'}}>
          {logoImage && 
            <Col>
              <Image src={getImage(logoImage)} style={{maxHeight: '300px'}} rounded fluid />
            </Col>
          }
          <Col>
          <span className="text-center">
            <h2>{pageName}</h2>
          </span>
            <p dangerouslySetInnerHTML={{__html: description}}></p>
          <span className="text-center">
            <p>{owner}</p>
          </span>
          </Col>
        </Row>
        :
        <>
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
              <InputGroup>
                <p style={{marginRight: 10, marginTop: 5}}>Nazov:</p>
                <input 
                  className={'form-control text-center'}
                  value={pageName} 
                  onChange={(e) => setPageName(e.target.value)} 
                  onBlur={handleShopNameChange}
                  name="pageName"
                  placeholder="Nazov"
                />
              </InputGroup>
              <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onChange={(event, editor) => {
                      const data = editor.getData()
                      setDescription(data)
                  }}
                  onBlur={handleDescriptionChange}
                  name="description"
              />
              <InputGroup style={{marginTop: 10}}>
                <p style={{marginRight: 10, marginTop: 5}}>Lektor:</p>
                <input 
                  className={'form-control text-center'}
                  value={owner} 
                  onChange={(e) => setOwner(e.target.value)} 
                  onBlur={handleOwnerChange}
                  name="owner"
                  placeholder="Lektor"
                />
              </InputGroup>
              <InputGroup>
                <p style={{marginRight: 10, marginTop: 5}}>Kategoria:</p>
                <select
                  className={'form-control text-center'}
                  onChange={(e) => setCategory(e.target.value)} 
                  onBlur={handleCategoryChange}
                  value={category} 
                >
                  <option>lekcie-kurzy</option>
                  <option>workshopy</option>
                  <option>lektori</option>
                </select>
              </InputGroup>
              <InputGroup>
                <p style={{marginRight: 10, marginTop: 5}}>Rozvrh:</p>
                <input 
                  className={'form-control text-center'}
                  value={rozvrhLink} 
                  onChange={(e) => setRozvrhLink(e.target.value)} 
                  onBlur={handleRozvrhLinkChange}
                  name="rozvrhLink"
                  placeholder="Link na rozvrh"
                />
              </InputGroup>
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
              <Button variant="dark" onClick={() => handleLocalUploadingTitle()}>Uploadni titulku</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="dark" onClick={() => handleLocalUploadingOverview()}>Uploadni kartu</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="dark" onClick={() => handleLocalUploadingLogoImage()}>Uploadni logo</Button>
            </Col>
          </Row>
        </>
        }
        {((localUploadingTitle || localUploadingOverview || localUploadingLogoImage) && editMode) ? 
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
                  Sem pretiahni alebo klikni a nahraj {localUploadingTitle ? 'titulku' : localUploadingLogoImage ? 'logo' : 'kartu'}.
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
        <Row className="mt-4 text-center">
          <Col>
            <Button onClick={() => setShowRozvrhPopup(true)} variant="dark">Prihlasit sa na kurz!</Button>
          </Col>
        </Row>
        {isOwner &&
        <Row className="mt-4 text-center">
          <Col>
            <Alert style={{display: `${error ? 'block' : 'none'}`}} variant="danger">{error}</Alert>
            {isUrlAvailible ? 
            <Button onClick={() => setEditMode(editMode ? false : true)} variant="dark">{editMode ? 'Hotovo' : 'Upravit'}</Button> :
            <Button disabled variant="dark">{editMode ? 'Hotovo' : 'Upravit'}</Button>}
          </Col>
        </Row>}
    </Jumbotron>
    </>
  );
};