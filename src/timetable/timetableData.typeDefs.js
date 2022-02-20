import { gql } from "apollo-server-core";

export default gql`
  type TimetableData {
    _id: ID
    teacherEmail: String
    index: Int
    day: Int
    subName: String
    color: String
    memo: String
  }
`;
