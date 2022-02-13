"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../../models/user"));

var _user2 = require("../user.utils");

var _default = {
  Mutation: {
    settingLink: (0, _user2.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var userEmail, siteName, memo, user, userLinkSiteName, newUserLink, _newUserLink;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail, siteName = _ref.siteName, memo = _ref.memo;
                _context.next = 3;
                return _user["default"].findOne({
                  email: userEmail
                });

              case 3:
                user = _context.sent;

                if (!(!user.link || user.link.lenght === 0)) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  link: link
                });

              case 7:
                return _context.abrupt("return", {
                  ok: true
                });

              case 8:
                userLinkSiteName = user.link.map(function (item) {
                  return item.siteName;
                });

                if (!userLinkSiteName.includes(siteName)) {
                  _context.next = 15;
                  break;
                }

                newUserLink = user.link.filter(function (item) {
                  return item.siteName !== siteName;
                });
                _context.next = 13;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  link: newUserLink
                });

              case 13:
                _context.next = 18;
                break;

              case 15:
                _newUserLink = [].concat((0, _toConsumableArray2["default"])(user.link), [{
                  siteName: siteName,
                  memo: memo
                }]);
                _context.next = 18;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  link: _newUserLink
                });

              case 18:
                return _context.abrupt("return", {
                  ok: true
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref2.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;