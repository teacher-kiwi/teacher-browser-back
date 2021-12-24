import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  schoolName: {
    type: String,
  },
  schoolCode: {
    type: String,
  },
  areaCode: {
    type: String,
  },
  schoolAdress: {
    type: String,
  },
  studentNum: {
    type: Number,
  },
  bgTheme: {
    type: String,
  },
  alergy: {
    type: [Number],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
