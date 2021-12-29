import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeStudentList(listId: ID): [StudentList]
  }
`;
