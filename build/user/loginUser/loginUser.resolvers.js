"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _default = {
  Mutation: {
    loginUser: function () {
      var _loginUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var email, password, user, passwordOk, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = _ref.email, password = _ref.password;
                _context.next = 3;
                return _user["default"].findOne({
                  email: email
                });

              case 3:
                user = _context.sent;

                if (user) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "사용자를 찾을 수 없습니다."
                });

              case 6:
                _context.next = 8;
                return _bcrypt["default"].compare(password, user.password);

              case 8:
                passwordOk = _context.sent;

                if (passwordOk) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호가 틀립니다."
                });

              case 11:
                _context.next = 13;
                return _user["default"].updateOne({
                  email: email
                }, {
                  certificate: null
                });

              case 13:
                _context.next = 15;
                return _jsonwebtoken["default"].sign({
                  email: user.email
                }, process.env.SECRET_KEY);

              case 15:
                token = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  token: token
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loginUser(_x, _x2) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }
};
exports["default"] = _default;