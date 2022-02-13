"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var toDoListSchema = new Schema({
  toDo: {
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
  isComplete: {
    type: Boolean,
    "default": false
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  star: {
    type: Number
  },
  allDate: {
    type: [Date]
  }
});

var ToDoList = _mongoose["default"].model("ToDoList", toDoListSchema);

var _default = ToDoList;
exports["default"] = _default;