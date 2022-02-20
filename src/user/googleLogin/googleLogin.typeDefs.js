import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    googleLogin(access_token: String!): loginResult
  }
`;
