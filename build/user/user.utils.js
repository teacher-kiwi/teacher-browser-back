"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedQueryResovler = exports.protectedMutationResovler = exports.getUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

var getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var _yield$jwt$verify, email, user;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (token) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", null);

          case 2:
            _context.next = 4;
            return _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);

          case 4:
            _yield$jwt$verify = _context.sent;
            email = _yield$jwt$verify.email;
            _context.next = 8;
            return _user["default"].findOne({
              email: email
            });

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", false);

          case 13:
            return _context.abrupt("return", user);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUser = getUser;

var protectedMutationResovler = function protectedMutationResovler(ourResolver) {
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(root, args, context, info) {
      var user;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (context.loggedInUser) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", {
                ok: false,
                error: "로그인이 필요합니다."
              });

            case 2:
              _context2.next = 4;
              return _user["default"].findOne({
                email: args.teacherEmail || args.userEmail
              });

            case 4:
              user = _context2.sent;

              if (user) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", {
                ok: false,
                error: "사용자를 찾을 수 없습니다."
              });

            case 7:
              if (!(user.email !== context.loggedInUser.email)) {
                _context2.next = 9;
                break;
              }

              return _context2.abrupt("return", {
                ok: false,
                error: "권한이 없습니다."
              });

            case 9:
              return _context2.abrupt("return", ourResolver(root, args, context, info));

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2, _x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.protectedMutationResovler = protectedMutationResovler;

var protectedQueryResovler = function protectedQueryResovler(ourResolver) {
  return /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(root, args, context, info) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (context.loggedInUser) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", {
                ok: false,
                error: "로그인이 필요합니다."
              });

            case 2:
              return _context3.abrupt("return", ourResolver(root, args, context, info));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x6, _x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();
};

exports.protectedQueryResovler = protectedQueryResovler;