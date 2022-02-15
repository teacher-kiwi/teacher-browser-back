"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _default = {
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var email, password, existUser, num, spe, uglyPassword, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = _ref.email, password = _ref.password;
                _context.next = 3;
                return _user["default"].findOne({
                  email: email
                }).exec();

              case 3:
                existUser = _context.sent;

                if (!existUser) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "이메일이 존재합니다."
                });

              case 6:
                if (!(password.length < 7 || password.length > 17)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다."
                });

              case 8:
                if (!(password.match(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/) !== null)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 숫자와 영문 또는 특수문자만 입력할 수 있습니다."
                });

              case 10:
                num = password.search(/[0-9]/g);

                if (!(num < 0)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 숫자 1자 이상을 포함해야 합니다."
                });

              case 13:
                spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

                if (!(spe < 1)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "비밀번호는 특수문자 2자 이상을 포함해야 합니다."
                });

              case 16:
                _context.next = 18;
                return _bcrypt["default"].hash(password, 10);

              case 18:
                uglyPassword = _context.sent;
                user = new _user["default"]({
                  email: email,
                  password: uglyPassword
                });
                _context.next = 22;
                return user.save();

              case 22:
                return _context.abrupt("return", {
                  ok: true
                });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }
};
exports["default"] = _default;