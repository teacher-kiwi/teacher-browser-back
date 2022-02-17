"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toDoList = _interopRequireDefault(require("../../models/toDoList"));

var _user = require("../../user/user.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Mutation: {
    editToDoList: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var _id, userEmail, toDo, star, startDate, endDate, contents, loggedInUser, allDate, term, termDay, i, day;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _id = _ref._id, userEmail = _ref.userEmail, toDo = _ref.toDo, star = _ref.star, startDate = _ref.startDate, endDate = _ref.endDate, contents = _ref.contents;
                loggedInUser = _ref2.loggedInUser;

                if (!startDate) {
                  _context.next = 9;
                  break;
                }

                allDate = null;

                if (startDate === endDate) {
                  allDate = [startDate];
                } else {
                  term = [];
                  termDay = (endDate - startDate) / 1000 / 60 / 60 / 24 - 1;

                  for (i = 0; i < termDay; i++) {
                    day = startDate + 86400000 * (i + 1);
                    term.push(day);
                  }

                  allDate = [startDate].concat(term, [endDate]);
                }

                _context.next = 7;
                return _toDoList["default"].updateOne({
                  _id: _id,
                  userEmail: userEmail
                }, _objectSpread(_objectSpread(_objectSpread(_objectSpread({
                  toDo: toDo
                }, contents ? {
                  contents: contents
                } : {
                  contents: null
                }), {}, {
                  star: star
                }, startDate ? {
                  startDate: startDate
                } : {
                  startDate: null
                }), endDate ? {
                  endDate: endDate
                } : {
                  endDate: null
                }), {}, {
                  allDate: allDate
                }));

              case 7:
                _context.next = 11;
                break;

              case 9:
                _context.next = 11;
                return _toDoList["default"].updateOne({
                  _id: _id,
                  userEmail: userEmail
                }, _objectSpread(_objectSpread({
                  toDo: toDo
                }, contents ? {
                  contents: contents
                } : {
                  contents: null
                }), {}, {
                  star: star,
                  startDate: null,
                  endDate: null,
                  allDate: []
                }));

              case 11:
                return _context.abrupt("return", {
                  ok: true
                });

              case 12:
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