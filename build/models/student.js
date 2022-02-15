"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var studentSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  studentNumber: {
    type: String,
    trim: true
  },
  studentGender: {
    type: String,
    required: true
  },
  allergy: {
    type: [Number]
  },
  tag: {
    type: [String],
    trim: true
  },
  listId: {
    type: [String]
  },
  trash: {
    type: Boolean,
    required: true,
    "default": false
  },
  memo: {
    type: String
  },
  icon: {
    type: Number
  }
});

var Student = _mongoose["default"].model("Student", studentSchema);

var _default = Student;
exports["default"] = _default;