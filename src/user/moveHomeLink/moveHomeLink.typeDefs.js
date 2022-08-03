import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    moveHomeLink(userEmail: String!, sourceIndex: Int!, destinationIndex: Int!): mutationResult
  }
`;
