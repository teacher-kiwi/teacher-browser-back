import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editHomeLink(
      userEmail: String!
      ID: Float!
      title: String!
      link: String!
    ): mutationResult
  }
`;
