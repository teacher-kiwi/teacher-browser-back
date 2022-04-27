import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeLikeFamilyStory(userEmail: String!): [FamilyStoryLike]
  }
`;
