import React, { useEffect, useState } from "react";
import axios from "axios";
import PagesOverview from "./PagesOverview";

import Spinner from "react-bootstrap/Spinner";

//Shop.js
export default ({ userData, category }) => {
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/page/`)
      .then((res) => setPageData(res.data ? res.data : {}))
      .catch((err) => {
        if (err) return console.log(`Fetch error: ${err}`);
      })
      .then(() => setLoading(false));
  }, []); //eslint-disable-line
  return (
    <>
      {loading ? (
        <Spinner
          style={{ marginLeft: "49%", marginTop: "20%" }}
          animation="border"
        />
      ) : <PagesOverview userData={userData} pageData={pageData.filter(data => data.category === category)} category={category} />}
    </>
  );
};
