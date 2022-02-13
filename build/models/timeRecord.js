"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var timeRecordSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  timeRecord: [{
    timeId: {
      type: Number,
      required: true
    },
    minutes: {
      type: Number,
      required: true
    },
    seconds: {
      type: Number,
      required: true
    },
    milliseconds: {
      type: Number,
      required: true
    }
  }]
});

var TimeRecord = _mongoose["default"].model("TimeRecord", timeRecordSchema);

var _default = TimeRecord;
exports["default"] = _default;