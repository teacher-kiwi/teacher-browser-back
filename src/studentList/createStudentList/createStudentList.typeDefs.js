import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createStudentList(teacherEmail: String!, listName: String!): mutationResult
  }
`;
