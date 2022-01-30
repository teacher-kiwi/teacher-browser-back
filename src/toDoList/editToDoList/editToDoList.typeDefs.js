import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editToDoList(
      _id: ID!
      userEmail: String!
      toDo: String
      isComplete: Boolean
      startDate: String
      endDate: String
      contents: String
    ): mutationResult
  }
`;
