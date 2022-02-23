"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _attendance = _interopRequireDefault(require("../../models/attendance"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    editAttendance: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var attendId, type, date, contents, month, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                attendId = _ref.attendId, type = _ref.type, date = _ref.date, contents = _ref.contents, month = _ref.month;
                loggedInUser = _ref2.loggedInUser;

                if (!contents) {
                  _context.next = 7;
                  break;
                }

                _context.next = 5;
                return _attendance["default"].updateOne({
                  userEmail: loggedInUser.email,
                  _id: attendId
                }, {
                  type: type,
                  date: date,
                  contents: contents,
                  month: month
                });

              case 5:
                _context.next = 9;
                break;

              case 7:
                _context.next = 9;
                return _attendance["default"].updateOne({
                  userEmail: loggedInUser.email,
                  _id: attendId
                }, {
                  type: type,
                  date: date,
                  month: month,
                  contents: null
                });

              case 9:
                return _context.abrupt("return", {
                  ok: true
                });

              case 10:
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