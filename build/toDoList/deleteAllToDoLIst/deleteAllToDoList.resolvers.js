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
    deleteAllToDoList: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var userEmail;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail;
                _context.next = 3;
                return _toDoList["default"].deleteMany({
                  userEmail: userEmail,
                  isComplete: true
                });

              case 3:
                return _context.abrupt("return", {
                  ok: true
                });

              case 4:
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