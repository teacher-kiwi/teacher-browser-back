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
    #
    likeNum: Int!
    isLiked: Boolean
  }

  type FamilyStoryLike {
    _id: ID!
    familyStoryId: ID!
    userEmail: String!
    #
    url: String
    titile: String
    bgColor: String
    videoType: String
    createdAt: Float
  }
`;
