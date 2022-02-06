import { gql } from "apollo-server-core";

export default gql`
  type ToDoList {
    _id: ID!
    toDo: String!
    userEmail: String!
    contents: String
    isComplete: Boolean
    startDate: String
    endDate: String
    ingToDo: Boolean
    notToDo: Boolean
    inComingToDo: Boolean
    star: Int
  }
`;
