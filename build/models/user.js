"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  certificate: {
    type: String,
    "default": null
  },
  schoolName: {
    type: String
  },
  schoolCode: {
    type: String
  },
  areaCode: {
    type: String
  },
  schoolAdress: {
    type: String
  },
  studentNum: {
    type: Number
  },
  bgTheme: {
    type: String,
    "default": "nature"
  },
  allergy: {
    type: [Number]
  },
  tag: {
    type: [String],
    "default": ["남학생", "여학생", "홀수", "짝수"]
  },
  favoriteNews: {
    type: [String]
  },
  link: {
    type: [{
      siteName: String,
      memo: String
    }]
  }
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;