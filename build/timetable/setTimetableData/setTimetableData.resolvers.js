"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _timetableData = _interopRequireDefault(require("../../models/timetableData"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    setTimetableData: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref, _ref2) {
        var teacherEmail, timetableData, loggedInUser, existedTimetableData, i;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, timetableData = _ref.timetableData;
                loggedInUser = _ref2.loggedInUser;
                _context2.next = 4;
                return _timetableData["default"].findOne({
                  teacherEmail: teacherEmail
                });

              case 4:
                existedTimetableData = _context2.sent;

                if (existedTimetableData) {
                  _context2.next = 13;
                  break;
                }

                i = 0;

              case 7:
                if (!(i < 30)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 10;
                return _timetableData["default"].create({
                  teacherEmail: teacherEmail,
                  index: i,
                  day: i % 5
                });

              case 10:
                i++;
                _context2.next = 7;
                break;

              case 13:
                timetableData.forEach( /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _timetableData["default"].updateOne({
                              teacherEmail: teacherEmail,
                              index: data.index
                            }, {
                              teacherEmail: teacherEmail,
                              index: data.index,
                              day: data.index % 5,
                              subName: data.subName,
                              color: data.color,
                              memo: data.memo
                            });

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                return _context2.abrupt("return", {
                  ok: true
                });

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