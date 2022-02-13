"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var pageLinkSchema = new Schema({
  pageTitle: {
    type: String,
    required: true
  },
  pageDescription: {
    type: String,
    required: true
  },
  pageURL: {
    type: String,
    required: true
  },
  folder: {
    type: [String],
    required: true
  },
  type: {
    type: String
  },
  updateAt: {
    type: Date,
    required: true
  }
});

var PageLink = _mongoose["default"].model("PageLink", pageLinkSchema);

var _default = PageLink;
exports["default"] = _default;