"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _student = _interopRequireDefault(require("../../models/student"));

var _user = _interopRequireDefault(require("../../models/user"));

var _user2 = require("../../user/user.utils");

var _default = {
  Mutation: {
    editStudent: (0, _user2.protectedMutationResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var teacherEmail, studentId, studentName, studentNumber, studentGender, parentPhoneNum, allergy, tag, delTag, trash, icon, memo, restoreAll, studentIcon, loggedInUser, existStudent, regex, student, totalAllergyInfo, allergyInfo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                teacherEmail = _ref.teacherEmail, studentId = _ref.studentId, studentName = _ref.studentName, studentNumber = _ref.studentNumber, studentGender = _ref.studentGender, parentPhoneNum = _ref.parentPhoneNum, allergy = _ref.allergy, tag = _ref.tag, delTag = _ref.delTag, trash = _ref.trash, icon = _ref.icon, memo = _ref.memo, restoreAll = _ref.restoreAll, studentIcon = _ref.studentIcon;
                loggedInUser = _ref2.loggedInUser;

                if (!studentName) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return _student["default"].findOne({
                  teacherEmail: teacherEmail,
                  studentName: studentName.trim()
                });

              case 5:
                existStudent = _context.sent;

                if (!existStudent) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "같은 이름의 학생이 존재합니다."
                });

              case 8:
                if (!studentNumber) {
                  _context.next = 18;
                  break;
                }

                regex = /^[0-9]*$/g;

                if (regex.test(studentNumber)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", {
                  ok: false,
                  error: "학생 번호에 숫자 이외의 문자가 입력되었습니다."
                });

              case 12:
                _context.next = 14;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  studentNumber: studentNumber
                });

              case 14:
                _context.next = 16;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  $addToSet: {
                    tag: parseInt(studentNumber) % 2 === 0 ? "짝수" : "홀수"
                  }
                });

              case 16:
                _context.next = 18;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  $pull: {
                    tag: parseInt(studentNumber) % 2 === 0 ? "홀수" : "짝수"
                  }
                });

              case 18:
                if (!studentGender) {
                  _context.next = 25;
                  break;
                }

                _context.next = 21;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  studentGender: studentGender
                });

              case 21:
                _context.next = 23;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  $addToSet: {
                    tag: studentGender === "male" ? "남학생" : "여학생"
                  }
                });

              case 23:
                _context.next = 25;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  $pull: {
                    tag: studentGender === "male" ? "여학생" : "남학생"
                  }
                });

              case 25:
                _context.next = 27;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  studentName: studentName,
                  parentPhoneNum: parentPhoneNum,
                  $addToSet: {
                    tag: tag
                  },
                  $pull: {
                    tag: delTag
                  },
                  memo: memo,
                  icon: icon
                });

              case 27:
                if (!allergy) {
                  _context.next = 39;
                  break;
                }

                _context.next = 30;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  allergy: allergy
                });

              case 30:
                _context.next = 32;
                return _student["default"].find({
                  teacherEmail: teacherEmail
                });

              case 32:
                student = _context.sent;
                totalAllergyInfo = [];
                student.forEach(function (e) {
                  return totalAllergyInfo.push.apply(totalAllergyInfo, e.allergy);
                });
                allergyInfo = (0, _toConsumableArray2["default"])(new Set(totalAllergyInfo));
                allergyInfo.sort(function (a, b) {
                  return a - b;
                });
                _context.next = 39;
                return _user["default"].updateOne({
                  email: teacherEmail
                }, {
                  allergy: allergyInfo
                });

              case 39:
                if (!(trash !== null)) {
                  _context.next = 42;
                  break;
                }

                _context.next = 42;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  trash: trash
                });

              case 42:
                if (!restoreAll) {
                  _context.next = 45;
                  break;
                }

                _context.next = 45;
                return _student["default"].updateMany({
                  teacherEmail: teacherEmail
                }, {
                  trash: false
                });

              case 45:
                if (!(studentIcon === "delete")) {
                  _context.next = 48;
                  break;
                }

                _context.next = 48;
                return _student["default"].updateOne({
                  _id: studentId
                }, {
                  icon: null
                });

              case 48:
                return _context.abrupt("return", {
                  ok: true
                });

              case 49:
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