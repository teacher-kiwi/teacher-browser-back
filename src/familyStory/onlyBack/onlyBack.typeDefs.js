import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteFamilyStoryLike(_id: String!): mutationResult
  }
`;
