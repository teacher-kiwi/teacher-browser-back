import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteTag(userEmail: String! tag: String!): mutationResult
  }
`