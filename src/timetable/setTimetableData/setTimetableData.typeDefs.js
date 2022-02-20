import { gql } from "apollo-server-core";

export default gql`
  input InputTimetableData {
    day: Int!
    time: Int!
    subName: String!
    color: String
    memo: String
  }

  type Mutation {
    setTimetableData(teacherEmail: String, timetableData: [InputTimetableData]): mutationResult
  }
`;
