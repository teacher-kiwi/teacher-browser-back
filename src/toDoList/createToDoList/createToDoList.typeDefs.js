import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createToDoList(
      toDo: String!
      userEmail: String!
      startDate: Float
      endDate: Float
      contents: String
      star: Int
    ): mutationResult
  }
`;
