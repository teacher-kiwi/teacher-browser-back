import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteDDay(userEmail: String!, ID: Float!): mutationResult
  }
`;
