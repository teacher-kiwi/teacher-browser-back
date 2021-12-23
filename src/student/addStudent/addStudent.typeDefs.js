import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    addStudent(
      teacherEmail: String!
      studentName: String!
      studentOrder: Int!
    ): mutationResult
  }
`;
