import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editStudentList(
      teacherEmail: String!
      listId: ID!
      listName: String
    ): mutationResult
  }
`;
