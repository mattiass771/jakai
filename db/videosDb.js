const mongoose = require("mongoose");
const router = require("express").Router();

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, required: true},
    description: { type: String } ,
});

const Video = mongoose.model("Video", videoSchema);

router.route("/").post((req, res) => {
    Video.find()
      .then((video) => res.json(video))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/get-video/:videoId").post((req, res) => {
    Video.findById(req.params.videoId)
      .then((video) => res.json(video))
      .catch((err) => res.status(400).json(`Error: ${err} !`));
});

router.route("/add-video").post((req, res) => {
    const { url, name, description } = req.body;
  
    const addVideo = new Video({
        url, 
        name, 
        description
    });
    addVideo
      .save()
      .then((response) => res.json(response._id))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/edit-video/:videoId").post((req, res) => {
    const { videoId } = req.params
    const { name, description } = req.body
  
    Video.findById(videoId, (err, videoFound) => {
      if (err) return console.log(err.data);
  
      videoFound.name = name
      videoFound.description = description
  
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