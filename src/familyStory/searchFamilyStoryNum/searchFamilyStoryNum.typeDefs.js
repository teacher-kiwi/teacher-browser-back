import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchFamilyStoryNum(tag: String!): Int!
  }
`;
