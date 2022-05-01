import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeAllFamilyStory(page: Int!): [FamilyStory]
  }
`;
