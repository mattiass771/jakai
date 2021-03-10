const mongoose = require("mongoose");
const router = require("express").Router();

const Schema = mongoose.Schema;

const blockSchema = new Schema({
    text: { type: String, required: true},
    imageLink: { type: String, required: true},
    variant: { type: String, required: true},
});

const Block = mongoose.model("Block", blockSchema);

router.route("/").get((req, res) => {
    Block.find()
      .then((block) => res.json(block))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:blockId").get((req, res) => {
    Block.findById(req.params.blockId)
      .then((block) => res.json(block))
      .catch((err) => res.status(400).json(`Error: ${err} !`));
});

router.route("/add").post((req, res) => {
    const { blockName, owner, ownerId, description, url } = req.body;
  
    const addBlock = new Block({
      blockName,
      owner,
      ownerId,
      description,
      url
    });
    addBlock
      .save()
      .then(() => res.json(`New block is now online!`))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/edit-block/:blockId").put((req, res) => {
    const { blockId } = req.params
    const { text, imageLink, variant } = req.body
  
    Block.findById(blockId, (err, blockFound) => {
      if (err) return console.log(err.data);
  
      blockFound.text = text
      blockFound.imageLink = imageLink
      blockFound.variant = variant
  
      blockFound
        .save()
        .then(() => res.json(`Block settings updated!`))
        .catch((error) => res.status(400).json(`Error: ${error}`));
    });
});

module.exports = {
    router,
    Block
};