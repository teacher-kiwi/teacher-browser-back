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
    editStudentList: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, listId, listName, listOrder, listIcon, loggedInUser, existStudentList;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, listId = _ref.listId, listName = _ref.listName, listOrder = _ref.listOrder, listIcon = _ref.listIcon;
                loggedInUser = _ref2.loggedInUser;

                if (!listName) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return _studentList["default"].findOne({
                  teacherEmail: teacherEmail,
                  listName: listName.trim()
                });

              case 5:
                existStudentList = _context.sent;

                if (!existStudentList) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "같은 이름의 리스트가 존재합니다."
                });

              case 8:
                _context.next = 10;
                return _studentList["default"].updateOne({
                  _id: listId
                }, {
                  listName: listName,
                  listOrder: listOrder,
                  listIcon: listIcon
                });

              case 10:
                if (!(listIcon === "delete")) {
                  _context.next = 13;
                  break;
                }

                _context.next = 13;
                return _studentList["default"].updateOne({
                  _id: listId
                }, {
                  listIcon: null
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