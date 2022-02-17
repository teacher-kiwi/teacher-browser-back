"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var attendanceSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  contents: {
    type: String
  }
});

var Attendance = _mongoose["default"].model("Attendance", attendanceSchema);

var _default = Attendance;
exports["default"] = _default;