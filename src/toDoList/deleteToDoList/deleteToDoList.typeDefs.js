import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteToDoList(_id: ID!, userEmail: String!): mutationResult
  }
`;
