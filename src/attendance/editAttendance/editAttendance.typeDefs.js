import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editAttendance(attendId: String!, userEmail: String, type: String!, date: String!, contents: String): mutationResult
  }
`