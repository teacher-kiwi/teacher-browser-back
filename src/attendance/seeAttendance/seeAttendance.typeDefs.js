import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeAttendance(date: Float, studentId: String, attendId: String, month: Int): [Attendance]
  }
`