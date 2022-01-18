import { gql } from "apollo-server-core";

export default gql`
  type Query {
    checkPw(userEmail: String!, password: String): mutationResult
  }
`;
