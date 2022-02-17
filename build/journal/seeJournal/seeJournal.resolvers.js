"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _journal = _interopRequireDefault(require("../../models/journal"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    seeJournal: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var teacherEmail, date, studentId, journalId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, date = _ref.date, studentId = _ref.studentId, journalId = _ref.journalId;

                if (!date) {
                  _context.next = 5;
                  break;
                }

                _context.next = 4;
                return _journal["default"].find({
                  teacherEmail: teacherEmail,
                  date: date
                }).sort({
                  _id: 1
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
                if (!journalId) {
                  _context.next = 9;
                  break;
                }

                _context.next = 8;
                return _journal["default"].find({
                  teacherEmail: teacherEmail,
                  _id: journalId
                });

              case 8:
                return _context.abrupt("return", _context.sent);

              case 9:
                if (!studentId) {
                  _context.next = 13;
                  break;
                }

                _context.next = 12;
                return _journal["default"].find({
                  teacherEmail: teacherEmail,
                  ownerId: studentId
                }).sort({
                  date: 1
                });

              case 12:
                return _context.abrupt("return", _context.sent);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;