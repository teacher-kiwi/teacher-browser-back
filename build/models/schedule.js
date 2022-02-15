"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var scheduleSchema = new Schema({
  schedule: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  contents: {
    type: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  term: {
    type: [Date],
    required: true
  },
  allDate: {
    type: [Date],
    required: true
  },
  sort: {
    type: Number,
    required: true
  }
});

var Schedule = _mongoose["default"].model("Schedule", scheduleSchema);

var _default = Schedule;
exports["default"] = _default;