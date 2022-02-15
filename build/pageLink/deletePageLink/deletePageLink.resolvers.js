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
    deletePageLink: function () {
      var _deletePageLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var pageTitle;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pageTitle = _ref.pageTitle;
                _context.next = 3;
                return _pageLink["default"].deleteOne({
                  pageTitle: pageTitle
                });

              case 3:
                return _context.abrupt("return", {
                  ok: true
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function deletePageLink(_x, _x2) {
        return _deletePageLink.apply(this, arguments);
      }

      return deletePageLink;
    }()
  }
};
exports["default"] = _default;