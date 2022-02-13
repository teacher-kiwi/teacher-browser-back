import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    writeJournal(userEmail: ID!, ownerId: ID!, date: String, text: String): mutationResult
  }
`;
