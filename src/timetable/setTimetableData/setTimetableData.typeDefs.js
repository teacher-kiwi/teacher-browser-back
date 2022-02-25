import { gql } from "apollo-server-core";

export default gql`

  type Mutation {
    setTimetableData(teacherEmail: String!, index: [Int]!, subName: String!, color: String, memo: String): mutationResult
  }
`;
