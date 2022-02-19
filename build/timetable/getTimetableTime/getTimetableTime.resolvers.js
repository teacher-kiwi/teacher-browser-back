"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _timetableTime = _interopRequireDefault(require("../../models/timetableTime"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    getTimetableTime: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, __, _ref) {
        var loggedInUser, time;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                loggedInUser = _ref.loggedInUser;
                _context.next = 3;
                return _timetableTime["default"].findOne({
                  teacherEmail: loggedInUser.email
                });

              case 3:
                time = _context.sent;

                if (!time) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", time);

              case 8:
                return _context.abrupt("return", {
                  _id: null,
                  teacherEmail: loggedInUser.email
                });

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