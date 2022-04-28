import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeMyFamilyStory(userEmail: String!, page: Int!): [FamilyStory]
  }
`;
