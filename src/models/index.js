require("dotenv").config()
import mongoose from "mongoose"

const MONGO_URL = process.env.DATABASE_URL

const dbConnect = () => {
  mongoose.connect(MONGO_URL, {
    dbName: "teacherBrowser",
  }).then(() => {
    {
      console.log("MongoDB Connected");
    }
  }).catch(err => {
    console.log(err);
  })
}

export default dbConnect