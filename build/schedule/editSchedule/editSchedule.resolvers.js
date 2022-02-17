"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schedule = _interopRequireDefault(require("../../models/schedule"));

var _user = require("../../user/user.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Mutation: {
    editSchedule: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var scheduleId, schedule, userEmail, startDate, endDate, contents, color, loggedInUser, delSchedule, termDay, term, i, day, allDate, enableSortArr, _i, includesSchedule, enableSort, newSchedule;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                scheduleId = _ref.scheduleId, schedule = _ref.schedule, userEmail = _ref.userEmail, startDate = _ref.startDate, endDate = _ref.endDate, contents = _ref.contents, color = _ref.color;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _schedule["default"].findOne({
                  userEmail: userEmail,
                  _id: scheduleId
                });

              case 4:
                delSchedule = _context.sent;
                _context.next = 7;
                return _schedule["default"].deleteOne({
                  userEmail: userEmail,
                  _id: scheduleId
                });

              case 7:
                termDay = (endDate - startDate) / 1000 / 60 / 60 / 24 - 1;
                term = [];

                for (i = 0; i < termDay; i++) {
                  day = startDate + 86400000 * (i + 1);
                  term.push(day);
                }

                allDate = [startDate].concat(term, [endDate]);
                enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                _i = 0;

              case 13:
                if (!(_i < allDate.length)) {
                  _context.next = 21;
                  break;
                }

                _context.next = 16;
                return _schedule["default"].find({
                  userEmail: loggedInUser.email,
                  allDate: allDate[_i]
                });

              case 16:
                includesSchedule = _context.sent;
                includesSchedule.forEach(function (item) {
                  enableSortArr = enableSortArr.filter(function (sort) {
                    return sort !== item.sort;
                  });
                });

              case 18:
                _i++;
                _context.next = 13;
                break;

              case 21:
                if (!(enableSortArr.length === 0)) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "생성된 일정이 너무 많습니다. 해당 기간의 일정을 지운 후 다시 생성하세요! 😭"
                });

              case 23:
                enableSort = Math.min.apply(Math, (0, _toConsumableArray2["default"])(enableSortArr));
                _context.next = 26;
                return _schedule["default"].create(_objectSpread({
                  schedule: schedule,
                  userEmail: userEmail,
                  color: color,
                  startDate: startDate,
                  endDate: endDate,
                  term: term,
                  allDate: allDate,
                  sort: enableSort
                }, contents && {
                  contents: contents
                }));

              case 26:
                newSchedule = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  schedule: newSchedule,
                  delSchedule: delSchedule
                });

              case 28:
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