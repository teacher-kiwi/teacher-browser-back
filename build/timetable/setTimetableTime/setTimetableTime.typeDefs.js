"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _apolloServerCore = require("apollo-server-core");

var _templateObject;

var _default = (0, _apolloServerCore.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Mutation {\n    setTimetableTime(\n      teacherEmail: String!\n      start1: String\n      end1: String\n      start2: String\n      end2: String\n      start3: String\n      end3: String\n      start4: String\n      end4: String\n      start5: String\n      end5: String\n      start6: String\n      end6: String\n    ): mutationResult\n  }\n"])));

exports["default"] = _default;