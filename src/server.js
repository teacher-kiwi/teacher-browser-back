require("dotenv").config();
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import logger from "morgan";
import { resolvers, typeDefs } from "./schema";
import dbConnect from "./models/index";
import { getUser } from "./user/user.utils";
dbConnect();

const PORT = process.env.PORT;

// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });
  await server.start();
  // 필요한 미들웨어 작성
  app.use(logger("tiny"));

  server.applyMiddleware({ app });
  await new Promise((r) => app.listen({ port: PORT }, r));
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
