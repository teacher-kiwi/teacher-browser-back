import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  school: {
    type: String
  }
})

const User = mongoose.model("User", userSchema)

export default User