import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createHomeLinks(
      userEmail: String!
      title: String!
      link: String!
      ID: Float!
    ): mutationResult
  }
`;
