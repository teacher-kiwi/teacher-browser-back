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
  Query: {
    seePageLink: function () {
      var _seePageLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var folder, pageTitle;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                folder = _ref.folder, pageTitle = _ref.pageTitle;

                if (!pageTitle) {
                  _context.next = 5;
                  break;
                }

                _context.next = 4;
                return _pageLink["default"].find({
                  pageTitle: pageTitle
                });

              case 4:
                return _context.abrupt("return", _context.sent);

              case 5:
                if (!folder) {
                  _context.next = 9;
                  break;
                }

                _context.next = 8;
                return _pageLink["default"].find({
                  folder: folder
                }).sort({
                  updateAt: -1
                });

              case 8:
                return _context.abrupt("return", _context.sent);

              case 9:
                _context.next = 11;
                return _pageLink["default"].find().sort({
                  updateAt: -1
                });

              case 11:
                return _context.abrupt("return", _context.sent);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seePageLink(_x, _x2) {
        return _seePageLink.apply(this, arguments);
      }

      return seePageLink;
    }()
  }
};
exports["default"] = _default;