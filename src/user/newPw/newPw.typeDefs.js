import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    newPw(userEmail: String!): mutationResult
  }
`;
