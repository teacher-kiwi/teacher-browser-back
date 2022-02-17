"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schedule = _interopRequireDefault(require("../../models/schedule"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    seeSchedule: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref, _ref2) {
        var scheduleId, dateArr, date, loggedInUser, _ret;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                scheduleId = _ref.scheduleId, dateArr = _ref.dateArr, date = _ref.date;
                loggedInUser = _ref2.loggedInUser;

                if (!scheduleId) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 5;
                return _schedule["default"].find({
                  userEmail: loggedInUser.email,
                  _id: scheduleId
                });

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                if (!dateArr) {
                  _context2.next = 11;
                  break;
                }

                return _context2.delegateYield( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  var returnSchedule, i, schedule, map, _i, _returnSchedule, item;

                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          returnSchedule = [];
                          i = 0;

                        case 2:
                          if (!(i < dateArr.length)) {
                            _context.next = 10;
                            break;
                          }

                          _context.next = 5;
                          return _schedule["default"].find({
                            userEmail: loggedInUser.email,
                            allDate: dateArr[i]
                          }).sort({
                            sort: 1
                          });

                        case 5:
                          schedule = _context.sent;

                          if (schedule.length === 0) {} else {
                            schedule.forEach(function (item) {
                              returnSchedule.push(item);
                            });
                          }

                        case 7:
                          i++;
                          _context.next = 2;
                          break;

                        case 10:
                          map = new Map();

                          for (_i = 0, _returnSchedule = returnSchedule; _i < _returnSchedule.length; _i++) {
                            item = _returnSchedule[_i];
                            map.set(JSON.stringify(item), item);
                          }

                          returnSchedule = (0, _toConsumableArray2["default"])(map.values());
                          return _context.abrupt("return", {
                            v: returnSchedule
                          });

                        case 14:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })(), "t0", 8);

              case 8:
                _ret = _context2.t0;

                if (!((0, _typeof2["default"])(_ret) === "object")) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", _ret.v);

              case 11:
                if (!date) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 14;
                return _schedule["default"].find({
                  userEmail: loggedInUser.email,
                  allDate: date
                }).sort({
                  sort: 1
                });

              case 14:
                return _context2.abrupt("return", _context2.sent);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;