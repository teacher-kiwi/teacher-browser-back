import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createTimeRecord(userEmail: String!, timeId: Int!, minutes: Int!, seconds: Int!, milliseconds: Int!): mutationResult
  }
`;
