import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createDDay(
      userEmail: String!
      title: String!
      date: Float!
      ID: Float!
    ): mutationResult
  }
`;
