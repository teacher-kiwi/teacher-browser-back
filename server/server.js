"use strict";
const dotenv = require("dotenv");
dotenv.config();

const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./src/config/schema.js");

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
