"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Mutation {\n    editToDoList(\n      _id: ID!\n      userEmail: String!\n      toDo: String\n      star: Int\n      startDate: String\n      endDate: String\n      contents: String\n    ): mutationResult\n  }\n"])));

exports["default"] = _default;