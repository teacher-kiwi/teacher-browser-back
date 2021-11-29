require("dotenv").config()
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import http from "http"
import logger from "morgan"
import { resolvers, typeDefs } from "./schema"
import dbConnect from "./models/index"
import { getUser } from "./user/user.utils"
dbConnect()

// // 타입 정의
// // 기본적으로 Query와 Mutation이 있음
// // 이후에 데이터베이스에 데이트를 만들 때 마다 해당 데이터의 typeDefs를 입력해야 함
// // ex) type User, type Student, type TodoList 등등
// const typeDefs = gql`
//   # Book이라는 타입은 아래의 내용을 가지고 있음
//   # title과 author가 있으며 이는 모두 String(문자열)형식
//   # 데이터베이스에 있는 데이터의 구성과 동일애햐 함
//   type Book {
//     title: String
//     author: String
//   }
//   # Query: 단순히 데이터를 불러올 때 쓰임(Read)
//   # Mutation: 데이터를 생성, 수정, 삭제를 할 때 쓰임(Create,Update,Delete)
//   type Query {
//     # resolvers에서 books를 호출하면 type Book의 데이터를 보여줘라
//     # 여기서 Book은 단일이고 [Book]은 복수
//     books: [Book],
//     # resolvers에서 hello를 호출하면 String형태의 무언가를 보여줘라
//     hello: String
//   }
// `;

// // 임시적인 데이터 베이스 역할
// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];

// // 우리가 정의한 Query, Mutation 등이 어떤 역할을 할 것인지를 정의
// const resolvers = {
//   Query: {
//     // books이라는 Query를 호출하면 books값이 return됨
//     // 실제 데이터베이스에서 데이터가 return될 때 단일이면 객체, 복수이면 배열 형태로 return됨
//     books: () => books,
//     // hello라는 Query를 호출하면 "Hi!"가 return됨
//     hello: () => "Hi!"
//   }
// };

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
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {
      console.log(req.headers.token);
      return {
        loggedInUser: await getUser(req.headers.token)
      }
    }
  })
  await server.start()
  // 필요한 미들웨어 작성
  app.use(logger("tiny"))

  server.applyMiddleware({ app })
  await new Promise(r => app.listen({ port: PORT }, r))
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)