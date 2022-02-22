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
    kakaoLogin: function () {
      var _kakaoLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref) {
        var uri, code, url, config, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                uri = _ref.uri, code = _ref.code;
                url = "https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=".concat(process.env.KAKAO_CLIENT_ID, "&redirect_uri=").concat(uri, "&code=").concat(code);
                config = {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                };
                _context2.next = 5;
                return _axios["default"].post(url, config).then(function (_ref2) {
                  var data = _ref2.data;
                  return (0, _axios["default"])({
                    url: "https://kapi.kakao.com/v2/user/me",
                    headers: {
                      Authorization: "Bearer ".concat(data.access_token)
                    }
                  }).then( /*#__PURE__*/function () {
                    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref3) {
                      var data, user, token;
                      return _regenerator["default"].wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              data = _ref3.data;

                              if (!data.kakao_account.email) {
                                _context.next = 14;
                                break;
                              }

                              _context.next = 4;
                              return _user["default"].findOne({
                                email: data.kakao_account.email
                              });

                            case 4:
                              user = _context.sent;

                              if (user) {
                                _context.next = 8;
                                break;
                              }

                              _context.next = 8;
                              return _user["default"].create({
                                email: data.kakao_account.email
                              });

                            case 8:
                              _context.next = 10;
                              return _jsonwebtoken["default"].sign({
                                email: data.kakao_account.email
                              }, process.env.SECRET_KEY);

                            case 10:
                              token = _context.sent;
                              return _context.abrupt("return", {
                                ok: true,
                                token: token
                              });

                            case 14:
                              return _context.abrupt("return", {
                                ok: true
                              });

                            case 15:
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
                })["catch"](function (_ref5) {
                  var response = _ref5.response;
                  return {
                    ok: false,
                    error: response.data.error_description
                  };
                });

              case 5:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function kakaoLogin(_x, _x2) {
        return _kakaoLogin.apply(this, arguments);
      }

      return kakaoLogin;
    }()
  }
};
exports["default"] = _default;