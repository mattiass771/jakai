const mongoose = require("mongoose");
const router = require("express").Router();

const Schema = mongoose.Schema;

// SCHEMAS //

const pageSchema = new Schema({
  pageName: { type: String, required: true, default: "New Page" },
  owner: { type: String, required: true, default: "Who is the owner?" },
  description: {
    type: String,
    required: true,
    default: "Add a brief description to your page..."
  },
  imageLink: {
    type: String,
  },
  overviewImage: {
    type: String,
  },
  url: {type: String, required: true},
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

router.route("/link/:link").get((req, res) => {
  const link = req.params.link;
  Page.findOne({ url: link })
    .then((page) => res.json(page))
    .catch((err) => res.status.apply(400).json(`Error: ${err} !`));
});

router.route("/add").post((req, res) => {
  const { pageName, owner, ownerId, description, url } = req.body;

  const addPage = new Page({
    pageName,
    owner,
    ownerId,
    description,
    url
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

router.route("/:id").delete((req, res) => {
  Page.findByIdAndDelete(req.params.id)
    .then(() => res.json("Page deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = {
  router,
  Page
};
