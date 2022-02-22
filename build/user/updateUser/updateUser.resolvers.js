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
    updateUser: (0, _user2.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var userEmail, schoolName, schoolCode, areaCode, schoolAdress, bgTheme, alergy, agreePolicy, loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userEmail = _ref.userEmail, schoolName = _ref.schoolName, schoolCode = _ref.schoolCode, areaCode = _ref.areaCode, schoolAdress = _ref.schoolAdress, bgTheme = _ref.bgTheme, alergy = _ref.alergy, agreePolicy = _ref.agreePolicy;
                loggedInUser = _ref2.loggedInUser;
                _context.next = 4;
                return _user["default"].updateOne({
                  email: userEmail
                }, {
                  schoolName: schoolName,
                  schoolCode: schoolCode,
                  areaCode: areaCode,
                  schoolAdress: schoolAdress,
                  bgTheme: bgTheme,
                  alergy: alergy,
                  agreePolicy: agreePolicy
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