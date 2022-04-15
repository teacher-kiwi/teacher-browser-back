import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAllDDay(userEmail: String!): mutationResult
  }
`;
