import React from "react";

import ShopJumbotron from "./ViewShop/ShopJumbotron";
import ViewBlocks from "./ViewShop/ViewBlocks"

// CreateShop.js
export default ({ pageData, isOwner }) => {
  return (
    <>
      <ShopJumbotron pageData={pageData} isOwner={isOwner} />
      <ViewBlocks pageId={pageData._id} blocksData={pageData.blocks} isOwner={isOwner} />
    </>
  );
};
