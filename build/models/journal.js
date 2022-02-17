"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var journalSchema = new Schema({
  ownerId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    trim: true,
    required: true
  },
  teacherEmail: {
    type: String,
    required: true
  }
});

var Journal = _mongoose["default"].model("Journal", journalSchema);

var _default = Journal;
exports["default"] = _default;