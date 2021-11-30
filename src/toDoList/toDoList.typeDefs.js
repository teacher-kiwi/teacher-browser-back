import { gql } from "apollo-server-core";

export default gql`
  type ToDoList {
    _id: ID!
    toDo: String!
    userEmail: String!
    isComplete: Boolean
  }
`