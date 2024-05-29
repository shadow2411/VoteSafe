const mongoose = require("mongoose");
const uri =
  "Your MongoDB URI";
console.log("Connecting to MongoDB");

const con = mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => console.log(error));

module.exports = { mongoose };
