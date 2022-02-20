import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    kakaoLogin(email: String!): loginResult
  }
`;
