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
        var day, loggedInUser, timetableData, i, newTimetableData, _timetableData, _i, _newTimetableData;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                day = _ref.day;
                loggedInUser = _ref2.loggedInUser;

                if (!day) {
                  _context.next = 23;
                  break;
                }

                _context.next = 5;
                return _timetableData2["default"].find({
                  teacherEmail: loggedInUser.email,
                  day: day
                }).sort({
                  index: 1
                });

              case 5:
                timetableData = _context.sent;

                if (!(timetableData.length !== 0)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", timetableData);

              case 10:
                i = 0;

              case 11:
                if (!(i < 30)) {
                  _context.next = 17;
                  break;
                }

                _context.next = 14;
                return _timetableData2["default"].create({
                  teacherEmail: loggedInUser.email,
                  index: i,
                  day: i % 5
                });

              case 14:
                i++;
                _context.next = 11;
                break;

              case 17:
                _context.next = 19;
                return _timetableData2["default"].find({
                  teacherEmail: loggedInUser.email,
                  day: day
                }).sort({
                  index: 1
                });

              case 19:
                newTimetableData = _context.sent;
                return _context.abrupt("return", newTimetableData);

              case 21:
                _context.next = 41;
                break;

              case 23:
                _context.next = 25;
                return _timetableData2["default"].find({
                  teacherEmail: loggedInUser.email
                }).sort({
                  index: 1
                });

              case 25:
                _timetableData = _context.sent;

                if (!(_timetableData.length !== 0)) {
                  _context.next = 30;
                  break;
                }

                return _context.abrupt("return", _timetableData);

              case 30:
                _i = 0;

              case 31:
                if (!(_i < 30)) {
                  _context.next = 37;
                  break;
                }

                _context.next = 34;
                return _timetableData2["default"].create({
                  teacherEmail: loggedInUser.email,
                  index: _i,
                  day: _i % 5
                });

              case 34:
                _i++;
                _context.next = 31;
                break;

              case 37:
                _context.next = 39;
                return _timetableData2["default"].find({
                  teacherEmail: loggedInUser.email
                }).sort({
                  index: 1
                });

              case 39:
                _newTimetableData = _context.sent;
                return _context.abrupt("return", _newTimetableData);

              case 41:
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