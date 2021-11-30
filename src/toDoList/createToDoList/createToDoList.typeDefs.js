import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createToDoList(toDo: String!, userEmail: String!): mutationResult
  }
`