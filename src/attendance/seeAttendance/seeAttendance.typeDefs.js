import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeAttendance(date: String, studentId: String): [Attendance]
  }
`