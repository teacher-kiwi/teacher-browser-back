import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudent(
      teacherEmail: String!
      studentId: String!
      studentName: String
      studentGender: String
    ): mutationResult
  }
`;
