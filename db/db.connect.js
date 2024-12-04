const mongoose = require("mongoose");

require("dotenv").config();
const mongoUri = process.env.MONGODB;

const intializeDataBase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log("Connect to Database");
    })
    .catch((error) => console.log("Error to connect database", error));
};
module.exports = { intializeDataBase };
