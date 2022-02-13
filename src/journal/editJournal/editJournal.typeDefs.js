import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editJournal(userEmail: ID!, journalId: ID, date: String, text: String): mutationResult
  }
`;
