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
    }(),
    journalNum: function () {
      var _journalNum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
        var _id;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _id = _ref2._id;
                return _context2.abrupt("return", _journal2["default"].count({
                  ownerId: _id
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function journalNum(_x2) {
        return _journalNum.apply(this, arguments);
      }

      return journalNum;
    }()
  }
};
exports["default"] = _default;