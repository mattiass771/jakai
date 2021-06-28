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

const showLinks = () => {
    const handleMouseOver = (_id) => {
        let hoverObj = {}
        hoverObj[_id] = 'none'
        setIsHoveredLinks({...isHoveredLinks, ...hoverObj})
    }
    const handleMouseLeave = () => {
        setIsHoveredLinks('')
    }
      return (
        <>
          <Col className="py-4" md={4} style={{height: '410px', maxWidth: '350px', minWidth: '300px', margin: '0 auto'}}>
            <Link to={`/lekcie-kurzy`}>
                <Card className="h-100" onMouseEnter={() => handleMouseOver('lekcie')} onTouchStart={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} style={{ textAlign:"center", color: "#333333", 
                border: '1.5px solid white'}} >
                    <Card.Img className={`${isHoveredLinks['lekcie'] === 'none' ? 'scale-out' : 'scale-in'}`} src="https://jakaibucket.s3.eu-central-1.amazonaws.com/Reflexn%C3%A1-mas%C3%A1%C5%BE-chodidiel_Jaka%C3%AD.jpg" style={{height: "80%", width: '100%', objectFit: 'cover'}} />
                    <Card.Body>
                      <Card.Title><h4>Lekcie a kurzy</h4></Card.Title>
                    </Card.Body>
                </Card>
            </Link>
          </Col>
          <Col className="py-4" md={4} style={{height: '410px', maxWidth: '350px', minWidth: '300px', margin: '0 auto'}}>
            <Link to={`/workshopy`}>
                <Card className="h-100" onMouseEnter={() => handleMouseOver('workshopy')} onTouchStart={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} style={{ textAlign:"center", color: "#333333", 
                border: '1.5px solid white'}} >
                    <Card.Img className={`${isHoveredLinks['workshopy'] === 'none' ? 'scale-out' : 'scale-in'}`} src="https://jakaibucket.s3.eu-central-1.amazonaws.com/60449a69f15b6c0b0400e10b-chlebik.jpg" style={{height: "80%", width: '100%', objectFit: 'cover'}} />
                    <Card.Body>
                      <Card.Title><h4>Workshopy a semináre</h4></Card.Title>
                    </Card.Body>
                </Card>
            </Link>
          </Col>
          <Col className="py-4" md={4} style={{height: '410px', maxWidth: '350px', minWidth: '300px', margin: '0 auto'}}>
            <a className="link-override" rel="noopener noreferrer" target="_blank" href={`https://mohendzodaro.com/kurzy/`}>
                <Card className={`h-100`} onMouseEnter={() => handleMouseOver('programy')} onTouchStart={() => handleMouseLeave()} onMouseLeave={() => handleMouseLeave()} 
                style={{ 
                  textAlign:"center",
                  color: "#333333" ,
                  border: '1.5px solid white'}} >
                    <Card.Img className={`${isHoveredLinks['programy'] === 'none' ? 'scale-out' : 'scale-in'}`} src="https://jakaibucket.s3.eu-central-1.amazonaws.com/60429f074cf12041b61e6346-MEDIT%C3%81CIA-PRE-DU%C5%A0U-%C5%BDENY-JAKA%C3%8D-1024x683.jpeg" style={{height: "80%", width: '100%', objectFit: 'cover'}} />
                    <Card.Body>
                      <Card.Title><h4>Programy pre ženy</h4></Card.Title>
                    </Card.Body>
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
    <Container>
      <Row className="my-4 py-4">
        {showLinks()}
      </Row>
    </Container>
  </>
  );
};
