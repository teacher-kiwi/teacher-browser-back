import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    changePw(userEmail: String!, password: String!, newPassword: String!): mutationResult
  }
`;
