"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _timeRecord = _interopRequireDefault(require("../../models/timeRecord"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    createTimeRecord: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var userEmail, timeId, minutes, seconds, milliseconds, loggedInUser, isRecord;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail, timeId = _ref.timeId, minutes = _ref.minutes, seconds = _ref.seconds, milliseconds = _ref.milliseconds;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _timeRecord["default"].findOne({
                  userEmail: userEmail
                });

              case 4:
                isRecord = _context.sent;

                if (!isRecord) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return _timeRecord["default"].updateOne({
                  userEmail: userEmail
                }, {
                  $push: {
                    timeRecord: {
                      timeId: timeId,
                      minutes: minutes,
                      seconds: seconds,
                      milliseconds: milliseconds
                    }
                  }
                });

              case 8:
                _context.next = 12;
                break;

              case 10:
                _context.next = 12;
                return _timeRecord["default"].create({
                  userEmail: userEmail,
                  timeRecord: [{
                    timeId: timeId,
                    minutes: minutes,
                    seconds: seconds,
                    milliseconds: milliseconds
                  }]
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