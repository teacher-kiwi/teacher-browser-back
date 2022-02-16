import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editJournal(userEmail: ID!, journalId: ID, date: Float, text: String): mutationResult
  }
`;
