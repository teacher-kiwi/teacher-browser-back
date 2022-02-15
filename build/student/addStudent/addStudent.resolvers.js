"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../../models/student"));

var _studentList = _interopRequireDefault(require("../../models/studentList"));

var _user = require("../../user/user.utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  Mutation: {
    addStudent: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, studentId, listId, loggedInUser, checkExist, _iterator, _step, id, studentList;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, studentId = _ref.studentId, listId = _ref.listId;
                loggedInUser = _ref2.loggedInUser;
                _iterator = _createForOfIteratorHelper(studentId);
                _context.prev = 3;

                _iterator.s();

              case 5:
                if ((_step = _iterator.n()).done) {
                  _context.next = 19;
                  break;
                }

                id = _step.value;
                _context.next = 9;
                return _studentList["default"].findOne({
                  _id: listId,
                  studentId: id
                });

              case 9:
                studentList = _context.sent;

                if (!studentList) {
                  _context.next = 13;
                  break;
                }

                checkExist = true;
                return _context.abrupt("continue", 17);

              case 13:
                _context.next = 15;
                return _studentList["default"].updateOne({
                  _id: listId
                }, {
                  $addToSet: {
                    studentId: id
                  }
                });

              case 15:
                _context.next = 17;
                return _student["default"].updateOne({
                  _id: id
                }, {
                  $addToSet: {
                    listId: listId
                  }
                });

              case 17:
                _context.next = 5;
                break;

              case 19:
                _context.next = 24;
                break;

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](3);

                _iterator.e(_context.t0);

              case 24:
                _context.prev = 24;

                _iterator.f();

                return _context.finish(24);

              case 27:
                if (!checkExist) {
                  _context.next = 31;
                  break;
                }

                return _context.abrupt("return", {
                  ok: true,
                  error: "일부 학생이 이미 리스트에 존재합니다."
                });

              case 31:
                return _context.abrupt("return", {
                  ok: true
                });

              case 32:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 21, 24, 27]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;