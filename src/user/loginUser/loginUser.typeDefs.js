import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    loginUser(email: String!, password: String!): loginResult
  }
`;
