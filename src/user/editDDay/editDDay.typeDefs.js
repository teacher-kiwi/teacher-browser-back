import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editDDay(userEmail: String!, ID: Float!, title: String!, date: Float!): mutationResult
  }
`;
