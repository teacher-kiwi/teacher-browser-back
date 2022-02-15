"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Mutation {\n    updateUser(\n      userEmail: String!\n      schoolName: String\n      schoolCode: String\n      areaCode: String\n      schoolAdress: String\n      bgTheme: String\n      alergy: [Int]\n    ): mutationResult\n  }\n"])));

exports["default"] = _default;