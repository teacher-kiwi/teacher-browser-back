"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _timetableData2 = _interopRequireDefault(require("../../models/timetableData"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    getTimetableData: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var day, loggedInUser, timetableData, _timetableData;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                day = _ref.day;
                loggedInUser = _ref2.loggedInUser;

                if (!day) {
                  _context.next = 9;
                  break;
                }

                _context.next = 5;
                return _timetableData2["default"].find({
                  teacherEmail: loggedInUser.email,
                  day: day
                }).sort({
                  time: 1
                });

              case 5:
                timetableData = _context.sent;
                return _context.abrupt("return", timetableData);

              case 9:
                _context.next = 11;
                return _timetableData2["default"].find({
                  teacherEmail: loggedInUser.email
                }).sort({
                  day: 1,
                  time: 1
                });

              case 11:
                _timetableData = _context.sent;
                return _context.abrupt("return", _timetableData);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;