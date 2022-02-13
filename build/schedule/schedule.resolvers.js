"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schedule = _interopRequireDefault(require("../models/schedule"));

var _default = {
  Schedule: {
    isSort: function () {
      var _isSort = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var allDate, sort, userEmail, enableSortArr, i, includesSchedule, enableSort;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                allDate = _ref.allDate, sort = _ref.sort, userEmail = _ref.userEmail;
                enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                i = 0;

              case 3:
                if (!(i < allDate.length)) {
                  _context.next = 11;
                  break;
                }

                _context.next = 6;
                return _schedule["default"].find({
                  userEmail: userEmail,
                  allDate: allDate[i]
                });

              case 6:
                includesSchedule = _context.sent;
                includesSchedule.forEach(function (item) {
                  enableSortArr = enableSortArr.filter(function (sort) {
                    return sort !== item.sort;
                  });
                });

              case 8:
                i++;
                _context.next = 3;
                break;

              case 11:
                enableSort = Math.min.apply(Math, (0, _toConsumableArray2["default"])(enableSortArr));

                if (!(enableSort < sort)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", enableSort);

              case 16:
                return _context.abrupt("return", null);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function isSort(_x) {
        return _isSort.apply(this, arguments);
      }

      return isSort;
    }()
  }
};
exports["default"] = _default;