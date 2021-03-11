const mongoose = require("mongoose");
const router = require("express").Router();

const Schema = mongoose.Schema;

// SCHEMAS //

const pageSchema = new Schema({
  pageName: { type: String, required: true },
  owner: { type: String },
  description: {
    type: String,
    required: true,
    default: "Pridaj popis"
  },
  imageLink: {
    type: String,
  },
  overviewImage: {
    type: String,
  },
  url: {type: String, required: true},
  category: {type: String },
  blocks: {type: Array},
  textColor: { type: String, required: true, default: "whitesmoke"}
});

const Page = mongoose.model("Page", pageSchema);

// ROUTES //

router.route("/").get((req, res) => {
  Page.find()
    .then((pages) => res.json(pages))
    .catch((err) => res.status(400).json(`Error: ${err} !`));
});

router.route("/:pageId").get((req, res) => {
  Page.findById(req.params.pageId)
    .then((page) => res.json(page))
    .catch((err) => res.status(400).json(`Error: ${err} !`));
});

router.route("/owner/:userId").get((req, res) => {
  const userId = req.params.userId;
  Page.findOne({ ownerId: userId })
    .then((page) => res.json(page))
    .catch((err) => res.status.apply(400).json(`Error: ${err} !`));
});

router.route("/category/:categ").get((req, res) => {
  const categ = req.params.categ;
  Page.find({ category: categ })
    .then((page) => res.json(page))
    .catch((err) => res.status.apply(400).json(`Error: ${err} !`));
});

router.route("/link/:link").get((req, res) => {
  const link = req.params.link;
  Page.findOne({ url: link })
    .then((page) => res.json(page))
    .catch((err) => res.status.apply(400).json(`Error: ${err} !`));
});

router.route("/add").post((req, res) => {
  const { pageName, owner, description, url, category } = req.body;

  const addPage = new Page({
    pageName,
    owner,
    description,
    url,
    category
  });
  addPage
    .save()
    .then(() => res.json(`Your page is now online!`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// REPLACE ATTRIBUTE WITH INPUT FOR SHOP
router.route("/:pageId/update-page/:find/:replace").put((req, res) => {
  const { pageId, find, replace } = req.params;

  const newValue = replace.replace(/_/g, " ");

  Page.findById(pageId, (err, pageFound) => {
    if (err) return console.log(err.data);
    pageFound[find] = newValue;

    pageFound
      .save()
      .then(() => res.json(`Page updated!`))
      .catch((error) => res.status(400).json(`Error: ${error}`));
  });
});

router.route("/:pageId/update-blocks/").post((req, res) => {
  const { pageId } = req.params;
  const { newBlock } = req.body

  Page.findById(pageId, (err, pageFound) => {
    if (err) return console.log(err.data);

    const prevBlocks = pageFound.blocks
    pageFound.blocks = [...prevBlocks, newBlock];

    pageFound
      .save()
      .then(() => res.json('Block added to the page'))
      .catch((error) => res.status(400).json(`Error: ${error}`));
  });
});

router.route("/:pageId/remove-block/").post((req, res) => {
  const { pageId } = req.params;
  const { blockId } = req.body

  Page.findById(pageId, (err, pageFound) => {
    if (err) return console.log(err.data);

    const prevBlocks = pageFound.blocks
    pageFound.blocks = prevBlocks.filter(block => block !== blockId)

    pageFound
      .save()
      .then(() => res.json('Block added to the page'))
      .catch((error) => res.status(400).json(`Error: ${error}`));
  });
});

router.route("/:id").delete((req, res) => {
  Page.findByIdAndDelete(req.params.id)
    .then(() => res.json("Page deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = {
  router,
  Page
};
