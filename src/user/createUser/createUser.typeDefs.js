import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createUser(email: String!, password: String!): mutationResult
  }
`