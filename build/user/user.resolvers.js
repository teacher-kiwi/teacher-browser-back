"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../models/student"));

var _user = _interopRequireDefault(require("../models/user"));

var _default = {
  User: {
    studentNum: function () {
      var _studentNum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var email, teacher;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = _ref.email;
                _context.next = 3;
                return _user["default"].findOne({
                  email: email
                });

              case 3:
                teacher = _context.sent;
                _context.next = 6;
                return _student["default"].count({
                  teacherEmail: teacher.email
                });

              case 6:
                return _context.abrupt("return", _context.sent);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function studentNum(_x) {
        return _studentNum.apply(this, arguments);
      }

      return studentNum;
    }()
  }
};
exports["default"] = _default;