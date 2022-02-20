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
    naverLogin: function () {
      var _naverLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref) {
        var code, state, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                code = _ref.code, state = _ref.state;
                console.log(process.env.NAVER_CLIENT_ID, process.env.NAVER_CLIENT_SECRET);
                _context2.next = 4;
                return (0, _axios["default"])("https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=".concat(process.env.NAVER_CLIENT_ID, "&client_secret=").concat(process.env.NAVER_CLIENT_SECRET, "&code=").concat(code, "&state=").concat(state)).then(function (_ref2) {
                  var data = _ref2.data;

                  if (data.access_token) {
                    return (0, _axios["default"])({
                      method: "get",
                      url: "https://openapi.naver.com/v1/nid/me",
                      headers: {
                        Authorization: "Bearer ".concat(data.access_token)
                      }
                    }).then( /*#__PURE__*/function () {
                      var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref3) {
                        var response, user, token;
                        return _regenerator["default"].wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                response = _ref3.data.response;
                                _context.next = 3;
                                return _user["default"].findOne({
                                  email: response.email
                                });

                              case 3:
                                user = _context.sent;

                                if (user) {
                                  _context.next = 7;
                                  break;
                                }

                                _context.next = 7;
                                return _user["default"].create({
                                  email: response.email
                                });

                              case 7:
                                _context.next = 9;
                                return _jsonwebtoken["default"].sign({
                                  email: response.email
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

                      return function (_x3) {
                        return _ref4.apply(this, arguments);
                      };
                    }());
                  } else if (data.error) {
                    return {
                      ok: false,
                      error: data.error_description
                    };
                  }
                });

              case 4:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function naverLogin(_x, _x2) {
        return _naverLogin.apply(this, arguments);
      }

      return naverLogin;
    }()
  }
};
exports["default"] = _default;