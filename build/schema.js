"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = exports.resolvers = void 0;

var _loadFiles = require("@graphql-tools/load-files");

var _merge = require("@graphql-tools/merge");

var loadedTypes = (0, _loadFiles.loadFilesSync)("".concat(__dirname, "/**/*.typeDefs.js"));
var loadedResolvers = (0, _loadFiles.loadFilesSync)("".concat(__dirname, "/**/*.resolvers.js")); // **'s mean all folders, *'s mean all files 

var typeDefs = (0, _merge.mergeTypeDefs)(loadedTypes);
exports.typeDefs = typeDefs;
var resolvers = (0, _merge.mergeResolvers)(loadedResolvers);
exports.resolvers = resolvers;