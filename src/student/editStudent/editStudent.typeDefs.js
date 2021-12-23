import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudent(
      teacherEmail: String!
      studentName: String!
      id: String!
    ): mutationResult
  }
`;
