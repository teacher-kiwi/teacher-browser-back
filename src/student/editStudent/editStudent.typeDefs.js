import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudent(
      teacherEmail: String!
      studentId: ID!
      studentOrder: Int
      studentName: String
      studentNumber: Int
      studentGender: String
      parentPhoneNum: String
      allergy: [Int]
      tag: [String]
      delTag: String
    ): mutationResult
  }
`;
