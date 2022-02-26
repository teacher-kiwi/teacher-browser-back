import { gql } from "apollo-server-core";

export default gql`

  type Mutation {
    resetTimetableData(teacherEmail: String!, resetIndex: Int!): mutationResult
  }
`;
