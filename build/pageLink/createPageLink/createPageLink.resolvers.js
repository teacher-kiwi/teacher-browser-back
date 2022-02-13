"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pageLink = _interopRequireDefault(require("../../models/pageLink"));

var _default = {
  Mutation: {
    createPageLink: function () {
      var _createPageLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var pageTitle, pageDescription, pageURL, folder, type, pageLink;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pageTitle = _ref.pageTitle, pageDescription = _ref.pageDescription, pageURL = _ref.pageURL, folder = _ref.folder, type = _ref.type;
                _context.next = 3;
                return _pageLink["default"].findOne({
                  pageTitle: pageTitle
                });

              case 3:
                pageLink = _context.sent;

                if (!pageLink) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "같은 이름의 추천 페이지 존재"
                });

              case 6:
                _context.next = 8;
                return _pageLink["default"].create({
                  pageTitle: pageTitle,
                  pageDescription: pageDescription,
                  pageURL: pageURL,
                  folder: folder,
                  type: type,
                  updateAt: new Date()
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

      function createPageLink(_x, _x2) {
        return _createPageLink.apply(this, arguments);
      }

      return createPageLink;
    }()
  }
};
exports["default"] = _default;