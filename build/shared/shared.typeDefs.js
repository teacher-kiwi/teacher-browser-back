"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type mutationResult {\n    ok: Boolean!\n    error: String\n  }\n  type loginResult {\n    ok: Boolean!\n    token: String\n    error: String\n  }\n  type scheduleMutationResult {\n    ok: Boolean!\n    schedule: Schedule!,\n    delSchedule: Schedule,\n    error: String\n  }\n"])));

exports["default"] = _default;