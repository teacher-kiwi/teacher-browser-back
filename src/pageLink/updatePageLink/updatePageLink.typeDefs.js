import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updatePageLink(pageTitle: String!, pageDescription: String, folder: [String]): mutationResult
  }
`;
