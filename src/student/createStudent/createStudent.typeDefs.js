import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createStudent(teacherEmail: String!, studentString: String!): mutationResult
  }
`