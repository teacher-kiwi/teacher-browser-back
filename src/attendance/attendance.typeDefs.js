import { gql } from "apollo-server-core";

export default gql`
  type Attendance {
    userEmail: String!
    studentId: String!
    type: String!
    date: String!
    contents: String
  }
`