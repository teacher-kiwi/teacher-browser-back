"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _user2 = require("../user.utils");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _default = {
  Query: {
    checkPw: (0, _user2.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var userEmail, password, loggedInUser, userData, hasPw, passwordOk;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail, password = _ref.password;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _user["default"].findOne({
                  email: userEmail
                });

              case 4:
                userData = _context.sent;
                hasPw = userData.password ? true : false;

                if (password) {
                  _context.next = 14;
                  break;
                }

                if (!hasPw) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", {
                  ok: true
                });

              case 11:
                return _context.abrupt("return", {
                  ok: false,
                  error: "다른 웹사이트에서 권한을 받은 계정입니다."
                });

              case 12:
                _context.next = 26;
                break;

              case 14:
                if (!hasPw) {
                  _context.next = 25;
                  break;
                }

                _context.next = 17;
                return _bcrypt["default"].compare(password, userData.password);

              case 17:
                passwordOk = _context.sent;

                if (!passwordOk) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", {
                  ok: true
                });

              case 22:
                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호가 틀립니다."
                });

              case 23:
                _context.next = 26;
                break;

              case 25:
                return _context.abrupt("return", {
                  ok: false,
                  error: "다른 웹사이트에서 권한을 받은 계정입니다."
                });

              case 26:
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