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
  Mutation: {
    completeToDoList: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var _id, userEmail, loggedInUser, toDoList;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _id = _ref._id, userEmail = _ref.userEmail;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _toDoList["default"].findOne({
                  _id: _id,
                  userEmail: userEmail
                });

              case 4:
                toDoList = _context.sent;

                if (!toDoList.isComplete) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return _toDoList["default"].updateOne({
                  _id: _id,
                  userEmail: userEmail
                }, {
                  isComplete: false
                });

              case 8:
                _context.next = 12;
                break;

              case 10:
                _context.next = 12;
                return _toDoList["default"].updateOne({
                  _id: _id,
                  userEmail: userEmail
                }, {
                  isComplete: true
                });

              case 12:
                return _context.abrupt("return", {
                  ok: true
                });

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