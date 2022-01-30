import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createToDoList(
      toDo: String!
      userEmail: String!
      startDate: String
      endDate: String
      contents: String
    ): mutationResult
  }
`;
