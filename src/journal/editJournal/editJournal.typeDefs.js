import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editJournal(userEmail: ID!, ownerId: ID!, index: Int, contents: Contents): mutationResult
  }
`;
