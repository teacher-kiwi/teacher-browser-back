import { gql } from "apollo-server-core";

export default gql`
  type Query {
    myFamilyStoryLikeNum(userEmail: String!): Int
  }
`;
