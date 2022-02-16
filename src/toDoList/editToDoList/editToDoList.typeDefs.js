import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editToDoList(
      _id: ID!
      userEmail: String!
      toDo: String
      star: Int
      startDate: Float
      endDate: Float
      contents: String
    ): mutationResult
  }
`;
