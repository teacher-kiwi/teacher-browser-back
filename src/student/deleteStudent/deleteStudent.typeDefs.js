import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteStudent(disconnectOnly: Boolean!, teacherEmail: String!, studentId: ID!, listId: ID): mutationResult
  }
`;
