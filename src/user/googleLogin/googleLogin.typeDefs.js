import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    googleLogin(email: String!): loginResult
  }
`;
