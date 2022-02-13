import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteJournal(userEmail: ID!, journalId: ID): mutationResult
  }
`;
