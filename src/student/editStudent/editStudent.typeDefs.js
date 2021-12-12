import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudent(teacherEmail: String!, name: String!, id: String!): mutationResult
  }
`