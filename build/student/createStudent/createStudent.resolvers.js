"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../../models/student"));

var _user = require("../../user/user.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Mutation: {
    createStudent: (0, _user.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, studentString, loggedInUser, studentArr, existStudent, i, student;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, studentString = _ref.studentString;
                loggedInUser = _ref2.loggedInUser;
                studentArr = JSON.parse(studentString);
                existStudent = [];
                i = 0;

              case 5:
                if (!(i < studentArr.length)) {
                  _context.next = 20;
                  break;
                }

                if (!(studentArr[i].name.trim() === "")) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("continue", 17);

              case 8:
                _context.next = 10;
                return _student["default"].findOne({
                  teacherEmail: teacherEmail,
                  studentName: studentArr[i].name
                });

              case 10:
                student = _context.sent;

                if (student) {
                  _context.next = 16;
                  break;
                }

                _context.next = 14;
                return _student["default"].create({
                  teacherEmail: teacherEmail,
                  studentName: studentArr[i].name,
                  studentGender: studentArr[i].gender,
                  tag: [studentArr[i].gender === "male" ? "남학생" : "여학생"]
                });

              case 14:
                _context.next = 17;
                break;

              case 16:
                existStudent.push(student.studentName);

              case 17:
                i++;
                _context.next = 5;
                break;

              case 20:
                return _context.abrupt("return", _objectSpread({
                  ok: true
                }, existStudent.length !== 0 && {
                  error: "".concat(existStudent.join(", "), "\uC758 \uC774\uB984\uC774 \uC911\uBCF5\uB429\uB2C8\uB2E4. \uD83D\uDE05")
                }));

              case 21:
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