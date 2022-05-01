import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editFamilyStory(
      id: String!
      userEmail: String!
      url: String!
      title: String!
      bgColor: String!
      videoType: String!
      tag: [String]
      contents: String!
    ): mutationResult
  }
`;
