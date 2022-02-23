"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _attendance = _interopRequireDefault(require("../../models/attendance"));

var _journal = _interopRequireDefault(require("../../models/journal"));

var _schedule = _interopRequireDefault(require("../../models/schedule"));

var _student = _interopRequireDefault(require("../../models/student"));

var _studentList = _interopRequireDefault(require("../../models/studentList"));

var _timeRecord = _interopRequireDefault(require("../../models/timeRecord"));

var _timetableData = _interopRequireDefault(require("../../models/timetableData"));

var _timetableTime = _interopRequireDefault(require("../../models/timetableTime"));

var _toDoList = _interopRequireDefault(require("../../models/toDoList"));

var _user = _interopRequireDefault(require("../../models/user"));

var _user2 = require("../../user/user.utils");

var _default = {
  Mutation: {
    deleteUser: (0, _user2.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _attendance["default"].deleteMany({
                  userEmail: teacherEmail
                });

              case 4:
                _context.next = 6;
                return _journal["default"].deleteMany({
                  teacherEmail: teacherEmail
                });

              case 6:
                _context.next = 8;
                return _schedule["default"].deleteMany({
                  userEmail: teacherEmail
                });

              case 8:
                _context.next = 10;
                return _student["default"].deleteMany({
                  teacherEmail: teacherEmail
                });

              case 10:
                _context.next = 12;
                return _studentList["default"].deleteMany({
                  teacherEmail: teacherEmail
                });

              case 12:
                _context.next = 14;
                return _timeRecord["default"].deleteMany({
                  userEmail: teacherEmail
                });

              case 14:
                _context.next = 16;
                return _timetableData["default"].deleteMany({
                  teacherEmail: teacherEmail
                });

              case 16:
                _context.next = 18;
                return _timetableTime["default"].deleteMany({
                  teacherEmail: teacherEmail
                });

              case 18:
                _context.next = 20;
                return _toDoList["default"].deleteMany({
                  userEmail: teacherEmail
                });

              case 20:
                _context.next = 22;
                return _schedule["default"].deleteMany({
                  userEmail: teacherEmail
                });

              case 22:
                _context.next = 24;
                return _user["default"].findOneAndDelete({
                  email: teacherEmail
                });

              case 24:
                return _context.abrupt("return", {
                  ok: true
                });

              case 25:
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