import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    completeToDoList(_id: ID!, userEmail: String!): mutationResult
  }
`;
