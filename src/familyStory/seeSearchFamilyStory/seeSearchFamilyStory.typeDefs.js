import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeSearchFamilyStory(tag: String!, page: Int!): [FamilyStory]
  }
`;
