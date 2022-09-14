import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deletePageLink(pageTitle: String!): mutationResult
  }
`;
