import { gql } from "apollo-server-core";

export default gql`
  type Query {
    myFamilyStoryNum(userEmail: String!): Int
  }
`;
