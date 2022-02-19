import { gql } from "apollo-server-core";

export default gql`
  input InputTimetableData {
    day: String!
    time: Int!
    subName: String!
    color: String
    memo: String
  }

  type Mutation {
    setTimetableData(teacherEmail: String, timetableData: [InputTimetableData]): mutationResult
  }
`;
