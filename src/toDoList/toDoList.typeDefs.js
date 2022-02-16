import { gql } from "apollo-server-core";

export default gql`
  type ToDoList {
    _id: ID!
    toDo: String!
    userEmail: String!
    contents: String
    isComplete: Boolean
    startDate: Float
    endDate: Float
    allDate: [Float]
    star: Int
  }
`;
