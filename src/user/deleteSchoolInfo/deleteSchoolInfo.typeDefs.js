import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteSchoolInfo(userEmail: String!): mutationResult
  }
`