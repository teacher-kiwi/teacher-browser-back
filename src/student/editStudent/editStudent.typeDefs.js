import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudent(
      teacherEmail: String!
      studentId: ID
      studentName: String
      studentNumber: String
      studentGender: String
      parentPhoneNum: String
      allergy: [Int]
      tag: [String]
      delTag: String
      trash: Boolean
      memo: String
      icon: Int,
      studentIcon: String,
      restoreAll: Boolean
    ): mutationResult
  }
`;
