"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _studentList = _interopRequireDefault(require("../../models/studentList"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    createStudentList: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, listName, loggedInUser, existStudentList, studentList, studentOrderList, studentListNum, i;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, listName = _ref.listName;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _studentList["default"].findOne({
                  teacherEmail: teacherEmail,
                  listName: listName.trim()
                });

              case 4:
                existStudentList = _context.sent;

                if (!existStudentList) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "리스트 이름이 존재합니다. 😅"
                });

              case 7:
                if (!(listName.trim() === "")) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "리스트 이름이 공백입니다. 😅"
                });

              case 9:
                _context.next = 11;
                return _studentList["default"].find({
                  teacherEmail: teacherEmail
                }).sort({
                  listOrder: 1
                });

              case 11:
                studentList = _context.sent;
                studentOrderList = studentList.map(function (e) {
                  return e.listOrder;
                });
                studentListNum = studentOrderList.length + 1;
                i = 0;

              case 15:
                if (!(i < studentOrderList.length)) {
                  _context.next = 22;
                  break;
                }

                if (!(studentOrderList[i] !== i + 1)) {
                  _context.next = 19;
                  break;
                }

                studentListNum = i + 1;
                return _context.abrupt("break", 22);

              case 19:
                i++;
                _context.next = 15;
                break;

              case 22:
                _context.next = 24;
                return _studentList["default"].create({
                  teacherEmail: teacherEmail,
                  listName: listName,
                  listOrder: studentListNum
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