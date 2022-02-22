"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _timetableTime = _interopRequireDefault(require("../../models/timetableTime"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    setTimetableTime: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, start1, end1, start2, end2, start3, end3, start4, end4, start5, end5, start6, end6, loggedInUser, time;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, start1 = _ref.start1, end1 = _ref.end1, start2 = _ref.start2, end2 = _ref.end2, start3 = _ref.start3, end3 = _ref.end3, start4 = _ref.start4, end4 = _ref.end4, start5 = _ref.start5, end5 = _ref.end5, start6 = _ref.start6, end6 = _ref.end6;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _timetableTime["default"].findOne({
                  teacherEmail: teacherEmail
                });

              case 4:
                time = _context.sent;

                if (!time) {
                  _context.next = 11;
                  break;
                }

                _context.next = 8;
                return _timetableTime["default"].updateOne({
                  teacherEmail: teacherEmail
                }, {
                  start1: start1,
                  end1: end1,
                  start2: start2,
                  end2: end2,
                  start3: start3,
                  end3: end3,
                  start4: start4,
                  end4: end4,
                  start5: start5,
                  end5: end5,
                  start6: start6,
                  end6: end6
                });

              case 8:
                return _context.abrupt("return", {
                  ok: true
                });

              case 11:
                _context.next = 13;
                return _timetableTime["default"].create({
                  teacherEmail: teacherEmail,
                  start1: start1,
                  end1: end1,
                  start2: start2,
                  end2: end2,
                  start3: start3,
                  end3: end3,
                  start4: start4,
                  end4: end4,
                  start5: start5,
                  end5: end5,
                  start6: start6,
                  end6: end6
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