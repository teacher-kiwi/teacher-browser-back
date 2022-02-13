import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeJournal(teacherEmail: String!, date: String, studentId: ID): [Journal]
  }
`