import React, {useState, useEffect} from "react";
import axios from 'axios';

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import UpdateDescription from './UpdateDescription';

import options from '../../config/options';

import { MdEdit } from "react-icons/md";

import defaultImage from "../../default.jpg"

const {MIN_HEIGHT_JUMBO} = options

//Home.js
export default ({userId, isOwner}) => {
  const [carouselData, setCarouselData] = useState('')
  const [loading, setLoading] = useState(false)
  const [descriptionGeneral, setDescriptionGeneral] = useState('')

  const [descriptionsPopup, setDescriptionsPopup] = useState(false)

  const [forceRefresh, setForceRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/home/`)
      .then(res => {
        const description = res.data.descriptionGeneral
        const subTitle = res.data.subTitleGeneral
        const title = res.data.titleGeneral
        setDescriptionGeneral({title, subTitle, description})
      })
      .catch(err => err && console.log('Error while fetching home data, ', err))
    axios.get(`http://localhost:5000/page/`)
      .then(res => setCarouselData(res.data))
      .catch(err => err && console.log('Error while fetching shops for carousel, ', err))
      .then(() => setLoading(false))
  }, [forceRefresh])

  const getImage = (image) => {
    try {
        const img = `https://jakaibucket.s3.eu-central-1.amazonaws.com/${image.replace(/_/g, '-')}`
        return img;
    } catch {
        return null;
    }
  };

  const ShowGeneral = ({fSz = '115%'}) => {
    return (
      <Row className="text-center mb-2">
        <Col className="mt-4 mb-4" style={{fontSize: fSz}}>
          {isOwner &&
            <Button
              onClick={() => setDescriptionsPopup(true)}
              style={{
                width: "40px",
                height: "40px",
                marginTop: "-40px",
                zIndex: "+1",
                position:'absolute'
              }}
              variant="outline-warning"
            >
              <MdEdit style={{ fontSize: "150%", margin: "0 0 15px -5px" }} />
            </Button>}
          {descriptionGeneral.description}
        </Col>
      </Row>
    )
  }
  
  const showCarouselWithData = () => {
    console.log(carouselData)
    return carouselData.map(shop => {
      const {pageName, owner, url, imageLink, textColor} = shop
      const image = imageLink
        ? getImage(imageLink)
        : defaultImage;
      return (
        <Carousel.Item className="car-image-bg" key={`${url}-${imageLink}`} 
          style={{
            height: MIN_HEIGHT_JUMBO*2, 
            width: "100%",
            background: `url(${image}) center center no-repeat`, 
            backgroundSize: 'cover'  
          }}
        >
          <Link to={`/${url}`}>
            <Carousel.Caption style={{zIndex:'+1' ,marginBottom: MIN_HEIGHT_JUMBO+75, color: textColor === 'white' ? 'whitesmoke' : '#333333'}}>
              <h3>{pageName}</h3>
              <p>{owner}</p>
            </Carousel.Caption>
          </Link>
          <div style={{backgroundColor: '#AE186595', color: "whitesmoke", padding: '40px', marginTop: MIN_HEIGHT_JUMBO, height: MIN_HEIGHT_JUMBO}}>
          </div>
        </Carousel.Item>
      )
    })
  }

  return (
    loading ? 
    <Spinner
      style={{ marginLeft: "49%", marginTop: "20%" }}
      animation="border"
    />
    :
    <>
    <div>
      {descriptionsPopup &&
        <UpdateDescription descriptionGeneral={descriptionGeneral} descriptionsPopup={descriptionsPopup} setDescriptionsPopup={setDescriptionsPopup} forceRefresh={forceRefresh} setForceRefresh={setForceRefresh} />
      }
      <Carousel indicators={false} style={{height: MIN_HEIGHT_JUMBO*2 }}>
        {carouselData && showCarouselWithData()}  
        <div style={{color: "whitesmoke", padding: '30px', marginTop: MIN_HEIGHT_JUMBO}}>
          <Container className="d-none d-md-block">
            <Row className="text-center justify-content-center pt-4">
              <Col className="pt-2" xs={1} sm={2} md={3} xl={4} >
                <hr style={{backgroundColor: "whitesmoke", paddingBottom: "1px"}} />
              </Col>
              <Col xs={10} sm={8} md={6} xl={4} >
                <h2>{descriptionGeneral.title}</h2>
              </Col>
              <Col className="pt-2"  xs={1} sm={2} md={3} xl={4} >
                <hr style={{backgroundColor: "whitesmoke", paddingBottom: "1px"}}/>
              </Col>
            </Row>
            <Row className="text-center justify-content-center">
              <Col>
                <em style={{fontSize: "160%"}}>{descriptionGeneral.subTitle}</em>
              </Col>
            </Row>
            <ShowGeneral />
          </Container>
          <Container className="d-none d-sm-block d-md-none">
            <Row className="text-center justify-content-center pt-2">
              <Col xs={10} sm={8} md={6} xl={4} >
                <h3>{descriptionGeneral.title}</h3>
              </Col>
            </Row>
            <Row className="text-center justify-content-center">
              <Col>
                <em style={{fontSize: "115%"}}>{descriptionGeneral.subTitle}</em>
              </Col>
            </Row>
            <ShowGeneral fSz="100%" />
          </Container>
          <Container className="d-block d-sm-none">
            <Row className="text-center justify-content-center">
              <Col xs={10} sm={8} md={6} xl={4} >
                <h4>{descriptionGeneral.title}</h4>
              </Col>
            </Row>
            <Row className="text-center justify-content-center">
              <Col>
                <em style={{fontSize: "100%"}}>{descriptionGeneral.subTitle}</em>
              </Col>
            </Row>
            <ShowGeneral fSz="85%" />
          </Container>
        </div>
      </Carousel>
    </div>
  </>
  );
};
