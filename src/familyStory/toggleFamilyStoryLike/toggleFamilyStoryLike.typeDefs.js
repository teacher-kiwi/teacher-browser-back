import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleFamilyStoryLike(
      userEmail: String!
      familyStoryId: String!
    ): includeMsgMutationResult
  }
`;
