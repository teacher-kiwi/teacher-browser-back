import { gql } from "apollo-server-core";

export default gql`
  type studentList {
    listId: String
    listOrder: Int
    listName: String
    studentId: [ID]
    students: [Student]
  }

  type Query {
    seeStudentList(listId: ID): [studentList]
  }
`;
