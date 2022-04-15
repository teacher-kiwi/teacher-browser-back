import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleIsMoveDDay(userEmail: String!): mutationResult
  }
`;
