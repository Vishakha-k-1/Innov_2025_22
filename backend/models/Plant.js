const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: String,
  scientificName: String,
  category: String,
  benefits: [String],
  image: String,
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
