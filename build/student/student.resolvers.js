"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _journal2 = _interopRequireDefault(require("../models/journal"));

var _default = {
  Student: {
    journal: function () {
      var _journal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var _id, journal;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _id = _ref._id;
                _context.next = 3;
                return _journal2["default"].find({
                  ownerId: _id.toString()
                });

              case 3:
                journal = _context.sent;
                return _context.abrupt("return", journal);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function journal(_x) {
        return _journal.apply(this, arguments);
      }

      return journal;
    }()
  }
};
exports["default"] = _default;