const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Plant = require("./models/Plant");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://anusuyasu22it:ySOidMdg4Zl5y9Qa@cluster0.qh0cs.mongodb.net/ayush-garden?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Get all plants
app.get("/plants", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plants" });
  }
});

// Get plants by category
app.get("/plants/:category", async (req, res) => {
  try {
    const plants = await Plant.find({ category: req.params.category });
    res.json(plants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plants" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
