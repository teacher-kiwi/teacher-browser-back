import { gql } from "apollo-server-core";

export default gql`
  input InputTimetableData {
    index: Int!
    subName: String
    color: String
    memo: String
  }

  type Mutation {
    setTimetableData(teacherEmail: String, timetableData: [InputTimetableData]): mutationResult
  }
`;
