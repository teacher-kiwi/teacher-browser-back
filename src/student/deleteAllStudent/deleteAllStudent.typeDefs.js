import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAllStudent(teacherEmail: String!): mutationResult
  }
`;
