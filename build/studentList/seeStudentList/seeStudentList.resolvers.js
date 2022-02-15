"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _studentList2 = _interopRequireDefault(require("../../models/studentList"));

var _user = require("../../user/user.utils");

var _default = {
  Query: {
    seeStudentList: (0, _user.protectedQueryResovler)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref, _ref2) {
        var listId, loggedInUser, studentList, _studentList, modifiedList;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                listId = _ref.listId;
                loggedInUser = _ref2.loggedInUser;

                if (!listId) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 5;
                return _studentList2["default"].findOne({
                  teacherEmail: loggedInUser.email,
                  _id: listId
                });

              case 5:
                studentList = _context2.sent;
                return _context2.abrupt("return", [{
                  listId: listId,
                  teacherEmail: studentList.teacherEmail,
                  listOrder: studentList.listOrder,
                  listName: studentList.listName,
                  listIcon: studentList.listIcon,
                  studentId: studentList.studentId
                }]);

              case 9:
                _context2.next = 11;
                return _studentList2["default"].find({
                  teacherEmail: loggedInUser.email
                }).sort({
                  listOrder: 1
                });

              case 11:
                _studentList = _context2.sent;
                modifiedList = _studentList.map( /*#__PURE__*/function () {
                  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(obj) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            return _context.abrupt("return", {
                              //_id로 리턴되는 key를 listId로 수정하기 위해서 map 메서드로 처리
                              listId: obj._id,
                              teacherEmail: obj.teacherEmail,
                              listOrder: obj.listOrder,
                              listName: obj.listName,
                              listIcon: obj.listIcon,
                              studentId: obj.studentId
                            });

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                return _context2.abrupt("return", modifiedList);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;