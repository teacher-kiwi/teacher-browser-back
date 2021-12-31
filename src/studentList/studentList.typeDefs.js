import { gql } from "apollo-server-core";

export default gql`
  type StudentList {
    listId: ID
    listOrder: Int
    listName: String
    studentId: [ID]
    students: [Student]
  }
`;
