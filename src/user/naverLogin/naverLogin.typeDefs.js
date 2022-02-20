import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    naverLogin(code: String, state: String): loginResult
  }
`;
