"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pageLink = _interopRequireDefault(require("../../models/pageLink"));

var _user = _interopRequireDefault(require("../../models/user"));

var _user2 = require("../../user/user.utils");

var _default = {
  Query: {
    seeMyPageLink: (0, _user2.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var userEmail, user, myPageLink, userLink, i, pageTitle, pageLink;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail;
                _context.next = 3;
                return _user["default"].findOne({
                  email: userEmail
                });

              case 3:
                user = _context.sent;

                if (user.link) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", []);

              case 6:
                if (!(user.link.length === 0)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", []);

              case 8:
                myPageLink = [];
                userLink = user.link;
                i = 0;

              case 11:
                if (!(i < userLink.length)) {
                  _context.next = 20;
                  break;
                }

                pageTitle = userLink[i].siteName;
                _context.next = 15;
                return _pageLink["default"].findOne({
                  pageTitle: pageTitle
                });

              case 15:
                pageLink = _context.sent;
                myPageLink.push(pageLink);

              case 17:
                i++;
                _context.next = 11;
                break;

              case 20:
                return _context.abrupt("return", myPageLink);

              case 21:
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