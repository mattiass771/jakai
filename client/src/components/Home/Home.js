import React, {useState, useEffect} from "react";
import axios from 'axios';

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
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
  const [carouselData, setCarouselData] = useState(['6049c49c4fcb58064cdad9e8-IMG-0070-1024x318.jpeg'])
  const [loading, setLoading] = useState(false)
  const [descriptionGeneral, setDescriptionGeneral] = useState('')
  const [isHoveredLinks, setIsHoveredLinks] = useState('')

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
        setLoading(false)
      })
      .catch(err => err && console.log('Error while fetching home data, ', err))
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

  const ShowLinks = () => {
    return (
      <>
        <Col md={4} style={{padding:'35px', height: '350px'}}>
          <Link to={`/lekcie-kurzy`}>
              <Card className="h-100" onMouseEnter={() => setIsHoveredLinks('lekcie')} onTouchStart={() => setIsHoveredLinks('')} onMouseLeave={() => setIsHoveredLinks('')} style={{ textAlign:"center", color: "whitesmoke", 
              border: '1.5px solid white'}} >
                  <Card.Img className="h-100" src="https://jakaibucket.s3.eu-central-1.amazonaws.com/Reflexn%C3%A1-mas%C3%A1%C5%BE-chodidiel_Jaka%C3%AD.jpg" style={{width: '100%', objectFit: 'cover'}} />
                  <Card.ImgOverlay className={`${isHoveredLinks === 'lekcie' ? 'fade-out' : 'fade-in'}`} style={{ background: "rgba(52,58,64,0.4)"}} >
                    <h3 style={{paddingTop: "50%"}}>Lekcie a kurzy</h3>
                  </Card.ImgOverlay>
              </Card>
          </Link>
        </Col>
        <Col md={4} style={{padding:'35px', height: '350px'}}>
          <Link to={`/workshopy`}>
              <Card className="h-100" onMouseEnter={() => setIsHoveredLinks('workshopy')} onTouchStart={() => setIsHoveredLinks('')} onMouseLeave={() => setIsHoveredLinks('')} style={{ textAlign:"center", color: "whitesmoke", 
              border: '1.5px solid white'}} >
                  <Card.Img className="h-100" src="https://jakaibucket.s3.eu-central-1.amazonaws.com/60449a69f15b6c0b0400e10b-chlebik.jpg" style={{width: '100%', objectFit: 'cover'}} />
                  <Card.ImgOverlay className={`${isHoveredLinks === 'workshopy' ? 'fade-out' : 'fade-in'}`} style={{ background: "rgba(52,58,64,0.4)"}} >
                    <h3 style={{paddingTop: "50%"}}>Workshopy a semináre</h3>
                  </Card.ImgOverlay>
              </Card>
          </Link>
        </Col>
        <Col md={4} style={{padding:'35px', height: '350px'}}>
          <a rel="noopener noreferrer" target="_blank" href={`https://mohendzodaro.com/kurzy/`}>
              <Card className="h-100" onMouseEnter={() => setIsHoveredLinks('programy')} onTouchStart={() => setIsHoveredLinks('')} onMouseLeave={() => setIsHoveredLinks('')} style={{ textAlign:"center", color: "whitesmoke", 
              border: '1.5px solid white'}} >
                  <Card.Img className="h-100" src="https://jakaibucket.s3.eu-central-1.amazonaws.com/60429f074cf12041b61e6346-MEDIT%C3%81CIA-PRE-DU%C5%A0U-%C5%BDENY-JAKA%C3%8D-1024x683.jpeg" style={{width: '100%', objectFit: 'cover'}} />
                  <Card.ImgOverlay className={`${isHoveredLinks === 'programy' ? 'fade-out' : 'fade-in'}`} style={{ background: "rgba(52,58,64,0.4)"}} >
                    <h3 style={{paddingTop: "50%"}}>Programy pre ženy</h3>
                  </Card.ImgOverlay>
              </Card>
          </a>
        </Col>
      </>
    )
  }
  
  const showCarouselWithData = () => {
    return carouselData.map(imageLink => {
      const image = imageLink
        ? getImage(imageLink)
        : defaultImage;
      return (
        <Carousel.Item className="car-image-bg" key={`${imageLink}`} 
          style={{
            height: MIN_HEIGHT_JUMBO, 
            width: "100%",
            background: `url(${image}) center center no-repeat`, 
            backgroundSize: 'cover'  
          }}
        >
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
      <Carousel controls={false} indicators={false} style={{height: MIN_HEIGHT_JUMBO }}>
        {carouselData && showCarouselWithData()}  
      </Carousel>
        <div style={{color: "#333333", padding: '30px', backgroundColor: 'whitesmoke'}}>
          <Container className="d-none d-md-block">
            <Row className="text-center justify-content-center pt-4">
              <Col className="pt-2" xs={1} sm={2} md={3} xl={4} >
                <hr style={{backgroundColor: "#333333", paddingBottom: "1px"}} />
              </Col>
              <Col xs={10} sm={8} md={6} xl={4} >
                <h2>{descriptionGeneral.title}</h2>
              </Col>
              <Col className="pt-2"  xs={1} sm={2} md={3} xl={4} >
                <hr style={{backgroundColor: "#333333", paddingBottom: "1px"}}/>
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
    </div>
    <div>  
      <Container>
        <Row className="py-4">
          <ShowLinks />
        </Row>
      </Container>
    </div>
  </>
  );
};
