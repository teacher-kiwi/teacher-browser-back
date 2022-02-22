"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Link {\n    siteName: String\n    memo: String\n  }\n\n  type User {\n    _id: ID!\n    email: String!\n    password: String\n    schoolName: String\n    schoolCode: String\n    areaCode: String\n    schoolAdress: String\n    studentNum: Int\n    bgTheme: String\n    allergy: [Int]\n    tag: [String]\n    favoriteNews: [String]\n    link: [Link]\n    agreePolicy: Boolean\n  }\n"])));

exports["default"] = _default;