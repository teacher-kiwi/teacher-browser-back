"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../../models/student"));

var _studentList = _interopRequireDefault(require("../../models/studentList"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    deleteStudent: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var disconnectOnly, teacherEmail, studentId, listId, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                disconnectOnly = _ref.disconnectOnly, teacherEmail = _ref.teacherEmail, studentId = _ref.studentId, listId = _ref.listId;
                loggedInUser = _ref2.loggedInUser;

                if (!disconnectOnly) {
                  _context.next = 9;
                  break;
                }

                _context.next = 5;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  $pull: {
                    listId: listId
                  }
                });

              case 5:
                _context.next = 7;
                return _studentList["default"].updateOne({
                  _id: listId
                }, {
                  $pull: {
                    studentId: studentId
                  }
                });

              case 7:
                _context.next = 13;
                break;

              case 9:
                _context.next = 11;
                return _student["default"].deleteOne({
                  _id: studentId
                });

              case 11:
                _context.next = 13;
                return _studentList["default"].updateMany({
                  $pull: {
                    studentId: studentId
                  }
                });

              case 13:
                return _context.abrupt("return", {
                  ok: true
                });

              case 14:
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