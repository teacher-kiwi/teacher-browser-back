import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createFamilyStory(
      userEmail: String!
      url: String!
      title: String!
      bgColor: String!
      videoType: String!
      tag: [String]
      createdAt: Float!
      contents: String!
    ): includeIdMutationResult
  }
`;
