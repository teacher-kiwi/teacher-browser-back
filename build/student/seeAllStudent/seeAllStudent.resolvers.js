"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../../models/student"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    seeAllStudent: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var studentId, allergy, tag, sort, trash, loggedInUser, sortValue;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                studentId = _ref.studentId, allergy = _ref.allergy, tag = _ref.tag, sort = _ref.sort, trash = _ref.trash;
                loggedInUser = _ref2.loggedInUser;
                sort === "name" ? // sort 값이 "name"일 경우 studentName으로 정렬
                sortValue = {
                  studentName: 1
                } : sort === "num" ? // sort 값이 "num"일 경우 studentNumber로 정렬
                sortValue = {
                  studentNumber: 1
                } : // sort 값이 없거나 "name" 이나 "num" 값이 아닐 경우 id(생성일)순으로 보기
                sortValue = {
                  _id: 1
                }; // tag 값이 있으면 tag가 있는 학생들 보기

                if (!tag) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return _student["default"].find({
                  teacherEmail: loggedInUser.email,
                  tag: {
                    $all: tag
                  },
                  trash: false
                }).sort(sortValue).collation({
                  locale: "ko",
                  numericOrdering: true
                });

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
                if (!allergy) {
                  _context.next = 11;
                  break;
                }

                _context.next = 10;
                return _student["default"].find({
                  teacherEmail: loggedInUser.email,
                  allergy: allergy
                }).sort(sortValue).collation({
                  locale: "ko",
                  numericOrdering: true
                });

              case 10:
                return _context.abrupt("return", _context.sent);

              case 11:
                if (!trash) {
                  _context.next = 15;
                  break;
                }

                _context.next = 14;
                return _student["default"].find({
                  teacherEmail: loggedInUser.email,
                  trash: true
                });

              case 14:
                return _context.abrupt("return", _context.sent);

              case 15:
                if (!studentId) {
                  _context.next = 21;
                  break;
                }

                _context.next = 18;
                return _student["default"].find({
                  _id: studentId,
                  teacherEmail: loggedInUser.email
                });

              case 18:
                return _context.abrupt("return", _context.sent);

              case 21:
                _context.next = 23;
                return _student["default"].find({
                  teacherEmail: loggedInUser.email,
                  trash: false
                }).sort(sortValue).collation({
                  locale: "ko",
                  numericOrdering: true
                });

              case 23:
                return _context.abrupt("return", _context.sent);

              case 24:
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