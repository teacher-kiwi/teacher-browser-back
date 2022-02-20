import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    kakaoLogin(uri: String!, code: String!): loginResult
  }
`;
