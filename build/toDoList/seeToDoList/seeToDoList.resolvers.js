"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toDoList = _interopRequireDefault(require("../../models/toDoList"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    seeToDoList: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var isComplete, id, date, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isComplete = _ref.isComplete, id = _ref.id, date = _ref.date;
                loggedInUser = _ref2.loggedInUser;

                if (!id) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return _toDoList["default"].find({
                  userEmail: loggedInUser.email,
                  _id: id
                });

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
                if (!date) {
                  _context.next = 10;
                  break;
                }

                _context.next = 9;
                return _toDoList["default"].find({
                  userEmail: loggedInUser.email,
                  allDate: new Date(date).setHours(0, 0, 0, 0)
                }, isComplete);

              case 9:
                return _context.abrupt("return", _context.sent);

              case 10:
                _context.next = 12;
                return _toDoList["default"].find({
                  userEmail: loggedInUser.email,
                  isComplete: isComplete
                }).sort({
                  _id: 1
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

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;