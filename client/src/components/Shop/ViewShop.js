import React from "react";

import ShopJumbotron from "./ViewShop/ShopJumbotron";

// CreateShop.js
export default ({ pageData, isOwner }) => {
  return (
    <>
      <ShopJumbotron pageData={pageData} isOwner={isOwner} />
    </>
  );
};
