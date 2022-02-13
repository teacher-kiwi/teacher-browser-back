"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schedule = _interopRequireDefault(require("../../models/schedule"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    deleteSchedule: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var scheduleId, userEmail, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                scheduleId = _ref.scheduleId, userEmail = _ref.userEmail;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _schedule["default"].deleteOne({
                  userEmail: userEmail,
                  _id: scheduleId
                });

              case 4:
                return _context.abrupt("return", {
                  ok: true
                });

              case 5:
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