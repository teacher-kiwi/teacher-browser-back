const mongoose = require("mongoose");

const NODE_ENV = process.env.NODE_ENV;
const DATABASE_URL = NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.TEST_DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(console.log(`💾 Connected to Database(${NODE_ENV})!`))
  .catch((err) => console.log("err: ", err));

module.exports = mongoose;
