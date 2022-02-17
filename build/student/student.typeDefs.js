"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Student {\n    _id: ID!\n    teacherEmail: String!\n    studentName: String!\n    studentNumber: String\n    studentGender: String!\n    allergy: [Int]\n    tag: [String]\n    listId: [ID]\n    trash: Boolean\n    memo: String\n    journal: [Journal]\n    journalNum: Int\n    icon: Int\n  }\n"])));

exports["default"] = _default;