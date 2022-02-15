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
  Mutation: {
    changePw: (0, _user2.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var userEmail, password, newPassword, loggedInUser, user, passwordOk, num, spe, uglyPassword;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail, password = _ref.password, newPassword = _ref.newPassword;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _user["default"].findOne({
                  email: userEmail
                });

              case 4:
                user = _context.sent;
                _context.next = 7;
                return _bcrypt["default"].compare(password, user.password);

              case 7:
                passwordOk = _context.sent;

                if (passwordOk) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호가 틀립니다."
                });

              case 10:
                if (!(newPassword.length < 7 || newPassword.length > 17)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다."
                });

              case 12:
                if (!(newPassword.match(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/) !== null)) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 숫자와 영문 또는 특수문자만 입력할 수 있습니다."
                });

              case 14:
                num = newPassword.search(/[0-9]/g);

                if (!(num < 0)) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 숫자 1자 이상을 포함해야 합니다."
                });

              case 17:
                spe = newPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

                if (!(spe < 1)) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 특수문자 2자 이상을 포함해야 합니다."
                });

              case 20:
                _context.next = 22;
                return _bcrypt["default"].hash(newPassword, 10);

              case 22:
                uglyPassword = _context.sent;
                _context.next = 25;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  password: uglyPassword
                });

              case 25:
                return _context.abrupt("return", {
                  ok: true
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