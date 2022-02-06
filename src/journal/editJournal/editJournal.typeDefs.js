import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editJournal(userEmail: ID!, ownerId: ID!, journalId: ID, contents: Contents): mutationResult
  }
`;
