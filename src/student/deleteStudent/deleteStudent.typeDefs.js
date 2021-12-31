import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteStudent(teacherEmail: String!, studentId: ID!): mutationResult
  }
`;
