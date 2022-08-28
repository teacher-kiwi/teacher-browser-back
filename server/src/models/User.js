const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
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
    type: [String],
  },
  link: {
    type: [{ siteName: String, memo: String }],
  },
  agreePolicy: {
    type: Boolean,
  },
  dDay: {
    type: [{ title: String, date: Number, ID: Number }],
  },
  isMoveDDay: {
    type: Boolean,
  },
  homeLinks: {
    type: [{ title: String, link: String, ID: Number }],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
