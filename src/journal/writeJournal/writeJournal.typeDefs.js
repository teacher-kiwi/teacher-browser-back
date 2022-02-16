import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    writeJournal(userEmail: ID!, ownerId: ID!, date: Float!, text: String!): mutationResult
  }
`;
