import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteStudent(teacherEmail: String!, studentName: String!): mutationResult
  }
`;
