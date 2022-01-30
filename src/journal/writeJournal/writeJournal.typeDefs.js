import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    writeJournal(userEmail: ID!, ownerId: ID!, contents: String): mutationResult
  }
`;
