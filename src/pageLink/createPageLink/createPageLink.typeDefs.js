import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createPageLink(
      pageTitle: String!,
      pageDescription: String!,
      pageURL: String!,
      folder: [String]!
      type: String
    ): mutationResult
  }
`;