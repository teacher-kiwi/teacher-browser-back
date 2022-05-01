import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteFamilyStoryLike(_id: String!): mutationResult
  }
  type Mutation {
    deleteAllFamilyStory(userEmail: String!): mutationResult
  }
  type Mutation {
    deleteAllFamilyStoryLike(userEmail: String!): mutationResult
  }
  type Mutation {
    deleteNotUserFamilyStory(_id: String!, userEmail: String!): mutationResult
  }
`;
