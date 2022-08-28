const dotenv = require("dotenv");
dotenv.config();

require("./src/config/db");

const { ApolloServer } = require("apollo-server");
const { typeDefs, resolvers } = require("./src/config/schema");
const { getUser } = require("./src/utils/_utils");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({ loggedInUser: await getUser(req.headers.token) }),
});

module.exports = server;
