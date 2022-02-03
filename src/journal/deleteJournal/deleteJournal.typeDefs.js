import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteJournal(userEmail: ID!, ownerId: ID!, index: Int): mutationResult
  }
`;