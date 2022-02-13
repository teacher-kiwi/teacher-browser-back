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
    changeStudentListOrder: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, preOrder, postOrder, loggedInUser, studentList, studentListId, studentListOrder, i;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, preOrder = _ref.preOrder, postOrder = _ref.postOrder;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _studentList["default"].find({
                  teacherEmail: teacherEmail
                }).sort({
                  listOrder: 1
                });

              case 4:
                studentList = _context.sent;
                studentListId = studentList.map(function (e) {
                  return e._id;
                });
                studentListOrder = studentList.map(function (e) {
                  return e.listOrder;
                });

                if (!(preOrder !== postOrder)) {
                  _context.next = 16;
                  break;
                }

                //
                // 순서를 더 뒤로 바꿀 때
                if (preOrder < postOrder) {
                  studentListOrder.splice(preOrder - 1, 0, studentListOrder[postOrder - 1]);
                  studentListOrder.splice(postOrder, 1);
                } //
                // 순서를 더 앞으로 바꿀 때
                else if (preOrder > postOrder) {
                  studentListOrder.splice(preOrder, 0, studentListOrder[postOrder - 1]);
                  studentListOrder.splice(postOrder - 1, 1);
                } //
                // 바꾼 순서대로 DB에 적용


                i = 0;

              case 10:
                if (!(i < studentList.length)) {
                  _context.next = 16;
                  break;
                }

                _context.next = 13;
                return _studentList["default"].updateOne({
                  _id: studentListId[i]
                }, {
                  listOrder: studentListOrder[i]
                });

              case 13:
                i++;
                _context.next = 10;
                break;

              case 16:
                return _context.abrupt("return", {
                  ok: true
                });

              case 17:
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