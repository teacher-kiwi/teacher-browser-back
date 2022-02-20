"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _default = {
  Mutation: {
    kakaoLogin: function () {
      var _kakaoLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var email, user, token;
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
                user = _context.sent;

                if (user) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return _user["default"].create({
                  email: email
                });

              case 7:
                _context.next = 9;
                return _jsonwebtoken["default"].sign({
                  email: email
                }, process.env.SECRET_KEY);

              case 9:
                token = _context.sent;
                return _context.abrupt("return", {
                  ok: true,
                  token: token
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function kakaoLogin(_x, _x2) {
        return _kakaoLogin.apply(this, arguments);
      }

      return kakaoLogin;
    }()
  }
};
exports["default"] = _default;