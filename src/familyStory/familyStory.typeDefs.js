import { gql } from "apollo-server-core";

export default gql`
  type FamilyStory {
    _id: ID!
    userEmail: String!
    url: String!
    title: String!
    bgColor: String!
    videoType: String!
    tag: [String]
    createdAt: Float!
    contents: String!
  }
`;
