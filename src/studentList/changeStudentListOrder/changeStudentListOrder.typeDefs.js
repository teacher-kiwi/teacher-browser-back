import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    changeStudentListOrder(
      teacherEmail: String!
      preOrder: Int!
      postOrder: Int!
    ): mutationResult
  }
`;
