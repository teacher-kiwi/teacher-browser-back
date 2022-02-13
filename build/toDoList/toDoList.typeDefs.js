"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type ToDoList {\n    _id: ID!\n    toDo: String!\n    userEmail: String!\n    contents: String\n    isComplete: Boolean\n    startDate: String\n    endDate: String\n    allDate: [String]\n    star: Int\n  }\n"])));

exports["default"] = _default;