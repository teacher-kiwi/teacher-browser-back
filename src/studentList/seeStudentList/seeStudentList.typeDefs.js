import { gql } from "apollo-server-core";

export default gql`
  type studentList {
    listId: String
    listOrder: Int
    listName: String
    students: [Student]
  }

  type Query {
    seeStudentList(listId: ID): [studentList]
  }
`;
