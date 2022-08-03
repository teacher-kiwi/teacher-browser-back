import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createTag(userEmail: String!, tag: [String]!): mutationResult
  }
`;
