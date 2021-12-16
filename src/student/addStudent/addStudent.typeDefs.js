import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    addStudent(teacherEmail: String!, name: String!, order: Int!): mutationResult
  }
`