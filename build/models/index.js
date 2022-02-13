"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

require("dotenv").config();

var MONGO_URL = process.env.DATABASE_URL;

var dbConnect = function dbConnect() {
  _mongoose["default"].connect(MONGO_URL, {
    dbName: "teachercan-db"
  }).then(function () {
    {
      console.log("MongoDB Connected");
    }
  })["catch"](function (err) {
    console.log(err);
  });
};

var _default = dbConnect;
exports["default"] = _default;