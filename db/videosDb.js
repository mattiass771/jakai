const mongoose = require("mongoose");
const router = require("express").Router();

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, required: true},
    description: { type: String },
    price: { type: Number },
    imageLink: { type: String },
    vidCollection: { type: String },
});

const Video = mongoose.model("Video", videoSchema);

router.route("/").post((req, res) => {
    Video.find()
      .then((video) => res.json(video))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/get-collections").post((req, res) => {
  Video.find()
    .then((video) => {
      const collections = video.map(vid => vid.vidCollection)
      const setCollections = new Set(collections)
      res.json([...setCollections])
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/get-videos-from-collection/:collect").post((req, res) => {
  const {collect} = req.params
  Video.find()
    .then((video) => {
      const collectionVideos = video.filter(vid => {
        const {vidCollection} = vid
        const formatted = vidCollection.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const queried = formatted.toLowerCase().replace(/[ ]/g, '-')
        const final = queried.replace('-video', '')
        if (final === collect) {
          return vid
        }
      })
      res.json(collectionVideos)
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/get-video/:videoId").post((req, res) => {
    Video.findById(req.params.videoId)
      .then((video) => res.json(video))
      .catch((err) => res.status(400).json(`Error: ${err} !`));
});

router.route("/add-video").post((req, res) => {
    const { url, name, description, price, imageLink, vidCollection } = req.body;
  
    const addVideo = new Video({
        url, 
        name, 
        description,
        price,
        imageLink,
        vidCollection,
    });
    addVideo
      .save()
      .then((response) => res.json(response._id))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/edit-video/:videoId").post((req, res) => {
    const { videoId } = req.params
    const { name, description, price, imageLink, vidCollection } = req.body
  
    Video.findById(videoId, (err, videoFound) => {
      if (err) return console.log(err.data);
  
      videoFound.name = name
      videoFound.description = description
      videoFound.price = price
      videoFound.imageLink = imageLink
      videoFound.vidCollection = vidCollection
  
      videoFound
        .save()
        .then(() => res.json(`Video settings updated!`))
        .catch((error) => res.status(400).json(`Error: ${error}`));
    });
});

router.route("/delete-video/:id").post((req, res) => {
  Video.findByIdAndDelete(req.params.id)
    .then(() => res.json("Video deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = {
    router,
    Video
};