import { gql } from "apollo-server-core";

export default gql`
  type StudentList {
    listId: ID!
    teacherEmail: String!
    listOrder: Int!
    listName: String!
    listIcon: String
    studentId: [ID]
    students: [Student]
  }
`;
