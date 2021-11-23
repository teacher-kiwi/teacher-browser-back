import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteUser(email: String!): mutationResult
  }
`