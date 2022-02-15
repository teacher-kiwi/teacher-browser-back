"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _apolloServerExpress = require("apollo-server-express");

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _morgan = _interopRequireDefault(require("morgan"));

var _schema = require("./schema");

var _index = _interopRequireDefault(require("./models/index"));

var _user = require("./user/user.utils");

require("dotenv").config();

(0, _index["default"])();
var PORT = process.env.PORT; // https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express

function startApolloServer(_x, _x2) {
  return _startApolloServer.apply(this, arguments);
}

function _startApolloServer() {
  _startApolloServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(typeDefs, resolvers) {
    var app, httpServer, server;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            app = (0, _express["default"])();
            httpServer = _http["default"].createServer(app);
            server = new _apolloServerExpress.ApolloServer({
              typeDefs: typeDefs,
              resolvers: resolvers,
              playground: true,
              introspection: true,
              plugins: [(0, _apolloServerCore.ApolloServerPluginDrainHttpServer)({
                httpServer: httpServer
              })],
              context: function () {
                var _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
                  var req;
                  return _regenerator["default"].wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          req = _ref.req;
                          _context2.next = 3;
                          return (0, _user.getUser)(req.headers.token);

                        case 3:
                          _context2.t0 = _context2.sent;
                          return _context2.abrupt("return", {
                            loggedInUser: _context2.t0
                          });

                        case 5:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                }));

                function context(_x3) {
                  return _context.apply(this, arguments);
                }

                return context;
              }()
            });
            _context3.next = 5;
            return server.start();

          case 5:
            // 필요한 미들웨어 작성
            app.use((0, _morgan["default"])("tiny"));
            server.applyMiddleware({
              app: app
            });
            _context3.next = 9;
            return new Promise(function (r) {
              return app.listen({
                port: PORT
              }, r);
            });

          case 9:
            console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(PORT).concat(server.graphqlPath));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _startApolloServer.apply(this, arguments);
}

startApolloServer(_schema.typeDefs, _schema.resolvers);