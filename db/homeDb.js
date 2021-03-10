const mongoose = require("mongoose");
const router = require("express").Router();

const Schema = mongoose.Schema;

const homeSchema = new Schema({
    descriptionGeneral: { type: String, required: true},
    titleGeneral: { type: String, required: true},
    subTitleGeneral: { type: String, required: true},
});
  
const Home = mongoose.model("Home", homeSchema);

router.route("/").get((req, res) => {
    Home.findOne()
      .then((home) => res.json(home))
      .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/general-description").put((req, res) => {
  const { descriptionGeneral, titleGeneral, subTitleGeneral } = req.body

  Home.findOne((err, homeFound) => {
    if (err) return console.log(err.data);

    homeFound.descriptionGeneral = descriptionGeneral
    homeFound.titleGeneral = titleGeneral
    homeFound.subTitleGeneral = subTitleGeneral

    homeFound
      .save()
      .then(() => res.json(`Home settings updated!`))
      .catch((error) => res.status(400).json(`Error: ${error}`));
  });
});

module.exports = {
    router,
    Home
};