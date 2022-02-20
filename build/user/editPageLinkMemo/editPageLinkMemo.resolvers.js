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

var _default = {
  Mutation: {
    editPageLinkMemo: (0, _user2.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var userEmail, memo, pageTitle, user, userLink, newUserLink;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail, memo = _ref.memo, pageTitle = _ref.pageTitle;
                _context.next = 3;
                return _user["default"].findOne({
                  email: userEmail
                });

              case 3:
                user = _context.sent;
                userLink = user.link;
                newUserLink = userLink.map(function (item) {
                  if (item.siteName === pageTitle) {
                    return {
                      siteName: pageTitle,
                      memo: memo,
                      _id: item._id
                    };
                  } else {
                    return item;
                  }
                });
                _context.next = 8;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  link: newUserLink
                });

              case 8:
                return _context.abrupt("return", {
                  ok: true
                });

              case 9:
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