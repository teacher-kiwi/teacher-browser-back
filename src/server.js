require("dotenv").config()
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer, gql } from "apollo-server-express"
import express from "express"
import http from "http"
import logger from "morgan"

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const PORT = process.env.PORT

// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express
async function startApolloServer(typeDefs, resolvers) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()
  // 필요한 미들웨서 작성
  app.use(logger("tiny"))

  server.applyMiddleware({ app })
  await new Promise(r => app.listen({ port: PORT }, r))
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)