import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteFamilyStory(userEmail: String!, familyStoryId: String!): mutationResult
  }
`;
