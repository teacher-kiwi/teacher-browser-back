import { gql } from "apollo-server-core";

export default gql`
  type Journal {
    date: String
    text: String
  }

  type Student {
    _id: ID!
    teacherEmail: String!
    studentName: String!
    studentNumber: String
    studentGender: String!
    allergy: [Int]
    tag: [String]
    listId: [ID]
    trash: Boolean
    memo: String
    journal: [Journal]
  }
`;
