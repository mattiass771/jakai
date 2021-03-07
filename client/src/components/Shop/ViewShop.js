import React from "react";

import ShopJumbotron from "./ViewShop/ShopJumbotron";

// CreateShop.js
export default ({ shopData, isOwner }) => {
  return (
    <>
      <ShopJumbotron shopData={shopData} isOwner={isOwner} />
    </>
  );
};
