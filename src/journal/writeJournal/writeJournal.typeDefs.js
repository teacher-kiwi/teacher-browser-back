import { gql } from "apollo-server-core";

export default gql`
  input Contents {
    date: String
    text: String
  }

  type Mutation {
    writeJournal(userEmail: ID!, ownerId: ID!, contents: Contents): mutationResult
  }
`;
