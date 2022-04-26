import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFamilyStory(id: String!): FamilyStory
  }
`;
