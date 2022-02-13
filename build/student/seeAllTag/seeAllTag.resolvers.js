"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../../models/student"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    seeAllTag: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, __, _ref) {
        var loggedInUser, allStudents, tags, uniqueTags;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                loggedInUser = _ref.loggedInUser;
                _context.next = 3;
                return _student["default"].find({
                  teacherEmail: loggedInUser.email
                });

              case 3:
                allStudents = _context.sent;
                tags = [];
                allStudents.forEach(function (e) {
                  return tags.push.apply(tags, e.tag);
                });
                uniqueTags = (0, _toConsumableArray2["default"])(new Set(tags));
                uniqueTags.sort(function (a, b) {
                  return a < b ? -1 : a > b ? 1 : 0;
                });
                return _context.abrupt("return", uniqueTags);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;