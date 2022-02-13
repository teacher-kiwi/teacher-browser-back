"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _journal = _interopRequireDefault(require("../../models/journal"));

var _user = require("../../user/user.utils");

var _default = {
  Mutation: {
    editJournal: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var journalId, date, text, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                journalId = _ref.journalId, date = _ref.date, text = _ref.text;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _journal["default"].updateOne({
                  _id: journalId
                }, {
                  date: date,
                  text: text
                });

              case 4:
                return _context.abrupt("return", {
                  ok: true
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;