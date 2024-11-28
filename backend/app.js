const express = require("express");
const app = express();
const cors = require("cors"); // Utilisation de require pour importer cors
app.use(cors());
app.use(express.json());

const PORT = 3000;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/mern", {})
  .then(() => console.log("Connected to MongoDB"));

const routes = require("./routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
