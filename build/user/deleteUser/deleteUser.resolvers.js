"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _student = _interopRequireDefault(require("../../models/student"));

var _studentList = _interopRequireDefault(require("../../models/studentList"));

var _toDoList = _interopRequireDefault(require("../../models/toDoList"));

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
                return _user["default"].findOneAndDelete({
                  email: teacherEmail
                });

              case 4:
                _context.next = 6;
                return _student["default"].deleteMany({
                  teacherEmail: teacherEmail
                });

              case 6:
                _context.next = 8;
                return _studentList["default"].deleteMany({
                  teacherEmail: teacherEmail
                });

              case 8:
                _context.next = 10;
                return _toDoList["default"].deleteMany({
                  userEmail: teacherEmail
                });

              case 10:
                return _context.abrupt("return", {
                  ok: true
                });

              case 11:
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