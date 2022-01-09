import { gql } from "apollo-server-core";

export default gql`
  type Student {
    _id: ID!
    teacherEmail: String!
    studentName: String!
    studentNumber: String
    studentGender: String!
    parentPhoneNum: String
    allergy: [Int]
    tag: [String]
    listId: [ID]
  }
`;
