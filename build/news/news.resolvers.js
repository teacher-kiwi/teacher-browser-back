"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _default = {
  Query: {
    getNews: function () {
      var _getNews = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var search, start, sort, _yield$axios, items;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                search = _ref.search, start = _ref.start, sort = _ref.sort;
                console.log(process.env.NAVER_CLIENT_ID);
                _context.prev = 2;
                _context.next = 5;
                return (0, _axios["default"])({
                  url: "https://openapi.naver.com/v1/search/news.json",
                  method: "get",
                  params: {
                    query: search,
                    start: start * 10,
                    sort: sort
                  },
                  headers: {
                    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
                  }
                });

              case 5:
                _yield$axios = _context.sent;
                items = _yield$axios.data.items;
                return _context.abrupt("return", items);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      function getNews(_x, _x2) {
        return _getNews.apply(this, arguments);
      }

      return getNews;
    }()
  }
};
exports["default"] = _default;