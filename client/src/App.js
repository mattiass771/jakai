import React, { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";

import "./index.css";
import "react-dropzone-uploader/dist/styles.css";

import Home from "./components/Home/Home";
import Pages from "./components/Shop/Pages";
import Login from "./components/Login/Login";
import ShopOnline from "./components/Shop/shopOnline/ShopOnline"
import ShoppingCart from "./components/Cart/ShoppingCart"
import Orders from "./components/Payment/Orders"
import SuccessPayment from "./components/Payment/SuccessPayment";
import RejectPayment from "./components/Payment/RejectPayment";
import SinglePage from "./components/SinglePage/SinglePage";
import Footer from "./components/Footer";
import Contact from './components/Contact/Contact';
import DeleteFromNewsletter from './components/Contact/DeleteFromNewsletter';
import Popup from './components/Law/Popup';
import MyVideos from './components/Videos/MyVideos';

import Spinner from "react-bootstrap/Spinner";

// App.js
export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loadingData, setLoadingData] = useState(false);
  const [showLawPopup, setShowLawPopup] = useState('')
  const [updateVideos, setUpdateVideos] = useState(false);

  useEffect(() => {
    setLoadingData(true)
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/get-user-data`, {
        withCredentials: true
      })
      .then((res) => {
        if (res.data) {
          const { _id, userName, fullName, email, shopId, isOwner, videos, myVideos } = res.data;
          setUserData({ _id, userName, fullName, email, shopId, isOwner, videos, myVideos });
          setIsLoggedIn(userName ? true : false);
        } else {
          setUserData({})
        }
      })
      .catch((err) => err && console.log("Load Error " + err))
      .then(() => setLoadingData(false))
  }, []);

  useEffect(() => {
    if (userData._id) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/${userData._id}/videos/`)
        .then(res => setUserData({...userData, videos: res.data}))
        .catch(err => console.log('error updating shopping cart...', err))
    }
  }, [updateVideos])

  const handleLogOut = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        withCredentials: true
      })
      .then(() => {
        setUserData({});
        setIsLoggedIn(false);
      })
      .catch((err) => console.log(`Error ${err}`))
      .then(() => window.location.reload());
  };
  return (
    <Router>
      {
        showLawPopup !== '' && <Popup showLawPopup={showLawPopup} setShowLawPopup={setShowLawPopup} />
      }
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
        crossOrigin="anonymous"
      />
      <div>
        <Navbar userName={userData.fullName} isLoggedIn={isLoggedIn} handleLogOut={handleLogOut} />
        {loadingData ? 
              <Spinner
                style={{ marginLeft: "49%", marginTop: "20%", color: 'whitesmoke' }}
                animation="border"
              /> :
        <div className="wrapper">
          <Switch>
            <Route exact path="/">
              <Home userId={userData._id} isOwner={userData.isOwner}  />
            </Route>
            <Route exact path="/lekcie-kurzy">
              <Pages userData={userData} category="lekcie-kurzy" />
            </Route>
            <Route exact path="/workshopy">
              <Pages userData={userData} category="workshopy" />
            </Route>
            <Route exact path="/login-page">
              {isLoggedIn ? <Home userId={userData._id} isOwner={userData.isOwner} /> : <Login />}
            </Route>
            <Route exact path="/kosik">
              <ShoppingCart userId={userData._id} />
            </Route>
            <Route exact path={`/success-payment`}>
              <SuccessPayment userId={userData._id} updateVideos={updateVideos} setUpdateVideos={setUpdateVideos} />
            </Route>
                <Route exact path={`/failed-payment`}>
              <RejectPayment userId={userData._id} />
            </Route>
            <Route exact path={`/cancel-payment`}>
              <RejectPayment userId={userData._id} />
            </Route>
            <Route exact path={`/objednavky`}>
              <Orders userEmail={userData.email} isOwner={userData.isOwner} />
            </Route>
            <Route exact path={`/lektori`}>
              <Pages userData={userData} category="lektori" />
            </Route>
            <Route exact path={`/ceny`}>
              <SinglePage isOwner={userData.isOwner} pageId={`6057526798dacf7257d7a4a4`} identificator={`ceny`} />
            </Route>
            <Route exact path={`/rozvrh`}>
              <SinglePage isOwner={userData.isOwner} pageId={`6050e08fb8a35737f49e1552`} identificator={`rozvrh`} />
            </Route>
            <Route exact path={`/online-kurzy/:kolekcia`}>
              <SinglePage userId={userData._id} videos={userData.videos} isOwner={userData.isOwner} identificator={`videoCollection`} />
            </Route>
            <Route exact path={`/online-kurzy/`}>
              <SinglePage userId={userData._id} videos={userData.videos} isOwner={userData.isOwner} pageId={`60701288c633d417d6dc66a7`} identificator={`videos`} />
            </Route>
            <Route exact path={`/moje-videa`}>
              <MyVideos userId={userData._id} myVideos={userData.myVideos} />
            </Route>
            <Route exact path={`/cennikprenajmu`}>
              <SinglePage isOwner={userData.isOwner} pageId={`605752f898dacf7257d7a4a5`} identificator={`cennikprenajmu`} />
            </Route>
            <Route exact path={`/galeria`}>
              <SinglePage isOwner={userData.isOwner} pageId={`6057535298dacf7257d7a4a6`} identificator={`galeria`} />
            </Route>
            <Route exact path={`/kontakt`}>
              <Contact setShowLawPopup={setShowLawPopup} />
            </Route>
            <Route exact path={`/odhlasit-newsletter`}>
              <DeleteFromNewsletter />
            </Route>
            <Route exact path={`/:shopUrl`}>
              <ShopOnline userId={userData._id} isOwner={userData.isOwner} />
            </Route>
          </Switch>
        </div>}
        <Footer showLawPopup={showLawPopup} setShowLawPopup={setShowLawPopup} />
      </div>    
    </Router>
  );
};
