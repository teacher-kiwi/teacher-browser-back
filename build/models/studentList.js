"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var studentListSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true
  },
  listOrder: {
    type: Number,
    required: true
  },
  listName: {
    type: String,
    required: true,
    trim: true
  },
  listIcon: {
    type: String
  },
  studentId: {
    type: [String]
  }
});

var StudentList = _mongoose["default"].model("StudentList", studentListSchema);

var _default = StudentList;
exports["default"] = _default;