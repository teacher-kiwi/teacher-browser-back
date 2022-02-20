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

var _axios = _interopRequireDefault(require("axios"));

var _default = {
  Mutation: {
    googleLogin: function () {
      var _googleLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref) {
        var access_token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                access_token = _ref.access_token;
                return _context2.abrupt("return", (0, _axios["default"])("https://www.googleapis.com/oauth2/v2/userinfo?access_token=".concat(access_token)).then( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
                    var user, token;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!data.data) {
                              _context.next = 13;
                              break;
                            }

                            _context.next = 3;
                            return _user["default"].findOne({
                              email: data.data.email
                            });

                          case 3:
                            user = _context.sent;

                            if (user) {
                              _context.next = 7;
                              break;
                            }

                            _context.next = 7;
                            return _user["default"].create({
                              email: data.data.email
                            });

                          case 7:
                            _context.next = 9;
                            return _jsonwebtoken["default"].sign({
                              email: data.data.email
                            }, process.env.SECRET_KEY);

                          case 9:
                            token = _context.sent;
                            return _context.abrupt("return", {
                              ok: true,
                              token: token
                            });

                          case 13:
                            if (!data.error) {
                              _context.next = 15;
                              break;
                            }

                            return _context.abrupt("return", {
                              ok: false,
                              error: data.error.status
                            });

                          case 15:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function googleLogin(_x, _x2) {
        return _googleLogin.apply(this, arguments);
      }

      return googleLogin;
    }()
  }
};
exports["default"] = _default;