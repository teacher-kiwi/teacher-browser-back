"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schedule = _interopRequireDefault(require("../../models/schedule"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    enableSortNum: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var scheduleId, userEmail, schedule, enableSortArr, i, includesSchedule, enableSort;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                scheduleId = _ref.scheduleId, userEmail = _ref.userEmail;
                _context.next = 3;
                return _schedule["default"].findOne({
                  userEmail: userEmail,
                  _id: scheduleId
                });

              case 3:
                schedule = _context.sent;
                enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                i = 0;

              case 6:
                if (!(i < schedule.allDate.length)) {
                  _context.next = 14;
                  break;
                }

                _context.next = 9;
                return _schedule["default"].find({
                  userEmail: userEmail,
                  allDate: schedule.allDate[i]
                });

              case 9:
                includesSchedule = _context.sent;
                includesSchedule.forEach(function (item) {
                  enableSortArr = enableSortArr.filter(function (sort) {
                    return sort !== item.sort;
                  });
                });

              case 11:
                i++;
                _context.next = 6;
                break;

              case 14:
                enableSort = Math.min.apply(Math, (0, _toConsumableArray2["default"])(enableSortArr));

                if (!(enableSort < schedule.sort)) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt("return", enableSort);

              case 19:
                return _context.abrupt("return", 0);

              case 20:
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