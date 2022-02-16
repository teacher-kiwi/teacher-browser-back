import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeJournal(teacherEmail: String!, date: Float, studentId: ID, journalId: String): [Journal]
  }
`