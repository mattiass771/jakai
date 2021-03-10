import React, { useEffect, useState } from "react";
import axios from "axios";
import PagesOverview from "./PagesOverview";

import Spinner from "react-bootstrap/Spinner";

//Shop.js
export default ({ userData }) => {
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/page/`)
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
      ) : <PagesOverview userData={userData} pageData={pageData} />}
    </>
  );
};
