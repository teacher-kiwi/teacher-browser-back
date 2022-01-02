import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    addStudent(teacherEmail: String!, studentId: [ID!], listId: ID!): mutationResult
  }
`;
