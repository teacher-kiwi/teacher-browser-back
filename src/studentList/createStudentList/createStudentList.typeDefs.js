import { gql } from "apollo-server-core";

export default gql`
  input Students {
    studentName: String
    studentOrder: Int
  }

  type Mutation {
    createStudentList(
      teacherEmail: String!
      listName: String!
      listOrder: Int!
      students: [Students]
    ): mutationResult
  }
`;
