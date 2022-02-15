import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAllToDoList(userEmail: String!): mutationResult
  }
`