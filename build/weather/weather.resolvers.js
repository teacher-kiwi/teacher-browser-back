"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

function getPmGrade(_x, _x2) {
  return _getPmGrade.apply(this, arguments);
}

function _getPmGrade() {
  _getPmGrade = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(lat, lng) {
    var _stationName$data, _stationName$data$res, _stationName$data$res2, _stationName$data$res3, _pmGrade$data$respons;

    var tmCoord, stationName, pmGrade;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _axios["default"])("https://dapi.kakao.com/v2/local/geo/transcoord.json?x=".concat(lng, "&y=").concat(lat, "&output_coord=TM"), {
              method: "GET",
              headers: {
                Authorization: "KakaoAK ".concat(process.env.KAKAO_API_KEY)
              }
            });

          case 2:
            tmCoord = _context.sent;
            _context.next = 5;
            return (0, _axios["default"])("http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList" + "?serviceKey=".concat(process.env.DATA_API_KEY) + "&returnType=json" + "&tmX=".concat(tmCoord.data.documents[0].x) + "&tmY=".concat(tmCoord.data.documents[0].y))["catch"](function (error) {
              return error.message;
            });

          case 5:
            stationName = _context.sent;
            _context.next = 8;
            return (0, _axios["default"])("http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty" + "?serviceKey=".concat(process.env.DATA_API_KEY) + "&returnType=json" + "&numOfRows=100" + "&stationName=".concat(encodeURI((_stationName$data = stationName.data) === null || _stationName$data === void 0 ? void 0 : (_stationName$data$res = _stationName$data.response) === null || _stationName$data$res === void 0 ? void 0 : (_stationName$data$res2 = _stationName$data$res.body) === null || _stationName$data$res2 === void 0 ? void 0 : (_stationName$data$res3 = _stationName$data$res2.items[0]) === null || _stationName$data$res3 === void 0 ? void 0 : _stationName$data$res3.stationName)) + "&dataTerm=DAILY" + "&ver=1.3")["catch"](function (error) {
              return error.message;
            });

          case 8:
            pmGrade = _context.sent;
            return _context.abrupt("return", {
              pm10grade: (_pmGrade$data$respons = pmGrade.data.response.body.items[0]) === null || _pmGrade$data$respons === void 0 ? void 0 : _pmGrade$data$respons.pm10Grade1h
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getPmGrade.apply(this, arguments);
}

function getWeather(_x3, _x4) {
  return _getWeather.apply(this, arguments);
}

function _getWeather() {
  _getWeather = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(lat, lng) {
    var _data$data, _data$data2;

    var data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _axios["default"])("https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lng, "&units=metric&appid=").concat(process.env.WEATHER_API_KEY))["catch"](function (error) {
              return error.message;
            });

          case 2:
            data = _context2.sent;
            return _context2.abrupt("return", {
              icon: data === null || data === void 0 ? void 0 : (_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.weather[0].icon,
              temp: data === null || data === void 0 ? void 0 : (_data$data2 = data.data) === null || _data$data2 === void 0 ? void 0 : _data$data2.main.temp
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getWeather.apply(this, arguments);
}

function getAdress(_x5, _x6) {
  return _getAdress.apply(this, arguments);
}

function _getAdress() {
  _getAdress = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(lat, lng) {
    var _yield$axios, _yield$axios$data$doc, data;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _axios["default"])({
              url: "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=".concat(lng, "&y=").concat(lat),
              method: "get",
              headers: {
                Authorization: "KakaoAK ".concat(process.env.KAKAO_API_KEY)
              }
            });

          case 2:
            _yield$axios = _context3.sent;
            _yield$axios$data$doc = (0, _slicedToArray2["default"])(_yield$axios.data.documents, 1);
            data = _yield$axios$data$doc[0];
            return _context3.abrupt("return", {
              address1: data === null || data === void 0 ? void 0 : data.address.region_2depth_name,
              address2: data === null || data === void 0 ? void 0 : data.address.region_3depth_name
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getAdress.apply(this, arguments);
}

function _weather2(_x7, _x8) {
  return _weather.apply(this, arguments);
}

function _weather() {
  _weather = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(lat, lng) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = Object;
            _context4.next = 3;
            return getAdress(lat, lng);

          case 3:
            _context4.t1 = _context4.sent;
            _context4.next = 6;
            return getWeather(lat, lng);

          case 6:
            _context4.t2 = _context4.sent;
            _context4.next = 9;
            return getPmGrade(lat, lng);

          case 9:
            _context4.t3 = _context4.sent;
            result = _context4.t0.assign.call(_context4.t0, _context4.t1, _context4.t2, _context4.t3);
            return _context4.abrupt("return", result);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _weather.apply(this, arguments);
}

var _default = {
  Query: {
    weather: function weather(_, _ref) {
      var lat = _ref.lat,
          lng = _ref.lng;
      return _weather2(lat, lng);
    }
  }
};
exports["default"] = _default;