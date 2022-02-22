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
  certificate: {
    type: String,
    default: null,
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
    default: "nature",
  },
  allergy: {
    type: [Number],
  },
  tag: {
    type: [String],
    default: ["남학생", "여학생", "홀수", "짝수"],
  },
  favoriteNews: {
    type: [String]
  },
  link: {
    type: [{ siteName: String, memo: String }]
  },
  agreePolicy: {
    type: Boolean
  }
});

const User = mongoose.model("User", userSchema);

export default User;
