import { gql } from "apollo-server-core";

export default gql`
  type Query {
    loginUser(email: String!, password: String!): loginResult
  }
`