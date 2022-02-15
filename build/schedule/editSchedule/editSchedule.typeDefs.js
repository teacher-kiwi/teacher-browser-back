"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Mutation {\n    editSchedule(\n      scheduleId: ID!\n      schedule: String!\n      userEmail: String!\n      startDate: String!\n      endDate: String!\n      contents: String\n      color: String!\n    ): mutationResult\n  }\n"])));

exports["default"] = _default;