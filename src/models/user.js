import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  }
})

export default mongoose.model("User", userSchema)