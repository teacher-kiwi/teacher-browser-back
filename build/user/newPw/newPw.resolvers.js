"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _default = {
  Mutation: {
    newPw: function () {
      var _newPw = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var userEmail, certificate, password, email, pw, chars, pwLength, i, randomNum, mailConfig, message, transporter, uglyPassword, _yield$User$findOne, hasCertificate, isCorrectKey, _uglyPassword;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail, certificate = _ref.certificate, password = _ref.password;

                if (!(userEmail && !certificate)) {
                  _context.next = 25;
                  break;
                }

                _context.next = 4;
                return _user["default"].findOne({
                  email: userEmail
                });

              case 4:
                email = _context.sent;

                if (email) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "가입된 email 정보가 없습니다."
                });

              case 7:
                if (email.password) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "다른 웹사이트에서 권한을 받은 계정입니다."
                });

              case 9:
                //
                // 인증코드 생성
                pw = "";
                chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-=_+";
                pwLength = 10;

                for (i = 0; i < pwLength; i++) {
                  randomNum = Math.floor(Math.random() * chars.length);
                  pw += chars[randomNum];
                } //
                // 인증코드 메일로 발송


                mailConfig = {
                  service: "Naver",
                  host: "smtp.naver.com",
                  port: 587,
                  auth: {
                    user: process.env.MAIL_EMAIL,
                    pass: process.env.MAIL_PASSWORD
                  }
                };
                message = {
                  from: process.env.MAIL_EMAIL,
                  to: userEmail,
                  subject: "teacher-browser 인증 코드 메일입니다.",
                  html: "<p>\uC778\uC99D\uCF54\uB4DC\uB294 <strong>".concat(pw, "</strong>\uC785\uB2C8\uB2E4.</p>")
                };
                transporter = _nodemailer["default"].createTransport(mailConfig);
                _context.next = 18;
                return transporter.sendMail(message);

              case 18:
                _context.next = 20;
                return _bcrypt["default"].hash(pw, 10);

              case 20:
                uglyPassword = _context.sent;
                _context.next = 23;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  certificate: uglyPassword
                });

              case 23:
                _context.next = 44;
                break;

              case 25:
                if (!(userEmail && certificate && password)) {
                  _context.next = 44;
                  break;
                }

                _context.next = 28;
                return _user["default"].findOne({
                  email: userEmail
                });

              case 28:
                _yield$User$findOne = _context.sent;
                hasCertificate = _yield$User$findOne.certificate;

                if (hasCertificate) {
                  _context.next = 32;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "인증코드를 다시 발송해주십시오."
                });

              case 32:
                _context.next = 34;
                return _bcrypt["default"].compare(certificate, hasCertificate);

              case 34:
                isCorrectKey = _context.sent;

                if (!isCorrectKey) {
                  _context.next = 43;
                  break;
                }

                _context.next = 38;
                return _bcrypt["default"].hash(password, 10);

              case 38:
                _uglyPassword = _context.sent;
                _context.next = 41;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  password: _uglyPassword,
                  certificate: null
                });

              case 41:
                _context.next = 44;
                break;

              case 43:
                return _context.abrupt("return", {
                  ok: false,
                  error: "인증코드가 틀렸습니다."
                });

              case 44:
                return _context.abrupt("return", {
                  ok: true
                });

              case 45:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function newPw(_x, _x2) {
        return _newPw.apply(this, arguments);
      }

      return newPw;
    }()
  }
};
exports["default"] = _default;