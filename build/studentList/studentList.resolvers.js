"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../models/student"));

var _default = {
  StudentList: {
    students: function () {
      var _students = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, _ref2) {
        var listId, sort, sortValue;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                listId = _ref.listId;
                sort = _ref2.sort;
                sort === "name" ? // sort 값이 "name"일 경우 studentName으로 정렬
                sortValue = {
                  studentName: 1
                } : sort === "num" ? // sort 값이 "num"일 경우 studentNumber로 정렬
                sortValue = {
                  studentNumber: 1
                } : // sort 값이 없거나 "name" 이나 "num" 값이 아닐 경우 id(생성일)순으로 보기
                sortValue = {
                  _id: 1
                };
                _context.next = 5;
                return _student["default"].find({
                  listId: listId.toString()
                }).sort(sortValue).collation({
                  locale: "ko",
                  numericOrdering: true
                });

              case 5:
                return _context.abrupt("return", _context.sent);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function students(_x, _x2) {
        return _students.apply(this, arguments);
      }

      return students;
    }()
  }
};
exports["default"] = _default;