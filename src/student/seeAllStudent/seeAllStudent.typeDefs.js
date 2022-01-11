import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeAllStudent(studentId: ID, allergy: Int, tag: [String], sort: String): [Student]
  }
`;
