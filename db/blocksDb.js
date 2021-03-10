const mongoose = require("mongoose");
const router = require("express").Router();

const Schema = mongoose.Schema;

const blockSchema = new Schema({
    text: { type: String },
    title: { type: String },
    imageLink: { type: String } ,
    variant: { type: String, required: true},
    pageId: { type: String },
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
    const { text, title, imageLink, variant, pageId } = req.body;
  
    const addBlock = new Block({
      text,
      title,
      imageLink,
      variant,
      pageId
    });
    addBlock
      .save()
      .then((response) => res.json(response._id))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/edit-block/:blockId").post((req, res) => {
    const { blockId } = req.params
    const { title, text, imageLink, variant } = req.body
  
    Block.findById(blockId, (err, blockFound) => {
      if (err) return console.log(err.data);
  
      blockFound.text = text
      blockFound.imageLink = imageLink
      blockFound.variant = variant
      blockFound.title = title
  
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