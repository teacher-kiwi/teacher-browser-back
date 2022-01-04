import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteStudentList(teacherEmail: String!, listId: ID!): mutationResult
  }
`;
