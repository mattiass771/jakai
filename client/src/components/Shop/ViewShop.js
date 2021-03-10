import React, {useState} from "react";

import ShopJumbotron from "./ViewShop/ShopJumbotron";
import AddBlock from "../Blocks/AddBlock";
import ViewBlocks from "./ViewShop/ViewBlocks"

import Button from "react-bootstrap/Button"

// CreateShop.js
export default ({ pageData, isOwner }) => {
  const [addBlockPopup, setAddBlockPopup] = useState(false)

  return (
    <>
      <ShopJumbotron pageData={pageData} isOwner={isOwner} />
      <div className="text-center">
        <Button size="sm" variant="dark" onClick={() => setAddBlockPopup(true)} >Pridat Blok</Button>
      </div>
      <ViewBlocks blocksData={pageData.blocks} isOwner={isOwner} />
      <AddBlock pageId={pageData._id} addBlockPopup={addBlockPopup} setAddBlockPopup={setAddBlockPopup} />
    </>
  );
};
