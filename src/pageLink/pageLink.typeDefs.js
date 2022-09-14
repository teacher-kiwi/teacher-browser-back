import { gql } from "apollo-server-core";

export default gql`
  type PageLink {
    _id: ID!
    pageTitle: String!
    pageDescription: String!
    pageURL: String!
    folder: [String]!
    type: String
    updateAt: String!
  }
`;
