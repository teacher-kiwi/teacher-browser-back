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
    updatePageLink: function () {
      var _updatePageLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var pageTitle, pageDescription, folder;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                pageTitle = _ref.pageTitle, pageDescription = _ref.pageDescription, folder = _ref.folder;
                _context.next = 3;
                return _pageLink["default"].updateOne({
                  pageTitle: pageTitle
                }, {
                  pageDescription: pageDescription,
                  folder: folder,
                  updateAt: new Date()
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

      function updatePageLink(_x, _x2) {
        return _updatePageLink.apply(this, arguments);
      }

      return updatePageLink;
    }()
  }
};
exports["default"] = _default;