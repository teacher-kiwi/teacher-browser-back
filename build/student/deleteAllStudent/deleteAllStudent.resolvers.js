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
    deleteAllStudent: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, loggedInUser, students, ids;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _student["default"].find({
                  teacherEmail: teacherEmail,
                  trash: true
                });

              case 4:
                students = _context.sent;
                ids = students.map(function (x) {
                  return x._id;
                }); //
                // 학생 리스트 전체를 뒤져서 휴지통에 있는 학생 id를 삭제하기

                _context.next = 8;
                return _studentList["default"].updateMany({
                  teacherEmail: teacherEmail
                }, {
                  $pull: {
                    studentId: {
                      $in: ids
                    }
                  }
                });

              case 8:
                _context.next = 10;
                return _student["default"].deleteMany({
                  teacherEmail: teacherEmail,
                  trash: true
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