import { gql } from "apollo-server-core";

export default gql`
  type TimetableData {
    _id: ID
    teacherEmail: String
    day: Int
    time: Int
    subName: String
    color: String
    memo: String
  }
`;
