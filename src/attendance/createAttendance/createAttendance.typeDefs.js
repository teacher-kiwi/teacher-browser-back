import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createAttendance(userEmail: String!, studentId: String!, type: String!, date: Float!, contents: String, month: Int!): mutationResult
  }
`