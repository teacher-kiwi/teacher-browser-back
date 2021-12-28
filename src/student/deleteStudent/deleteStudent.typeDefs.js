import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteStudent(teacherEmail: String!, studentId: String!): mutationResult
  }
`;
