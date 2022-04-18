import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteHomeLink(userEmail: String!, ID: Float!): mutationResult
  }
`;
