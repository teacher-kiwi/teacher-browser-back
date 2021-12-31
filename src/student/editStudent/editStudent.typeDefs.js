import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudent(
      teacherEmail: String!
      studentId: ID!
      studentName: String
      studentGender: String
    ): mutationResult
  }
`;
