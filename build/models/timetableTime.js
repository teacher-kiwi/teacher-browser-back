"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var timetableTimeSchema = new Schema({
  teacherEmail: {
    type: String,
    required: true
  },
  start1: {
    type: String
  },
  end1: {
    type: String
  },
  start2: {
    type: String
  },
  end2: {
    type: String
  },
  start3: {
    type: String
  },
  end3: {
    type: String
  },
  start4: {
    type: String
  },
  end4: {
    type: String
  },
  start5: {
    type: String
  },
  end5: {
    type: String
  },
  start6: {
    type: String
  },
  end6: {
    type: String
  }
});

var TimetableTime = _mongoose["default"].model("TimetableTime", timetableTimeSchema);

var _default = TimetableTime;
exports["default"] = _default;