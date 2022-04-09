import { gql } from "apollo-server-core";

export default gql`
  type Attendance {
    _id: ID!
    userEmail: String!
    studentId: String!
    type: String!
    date: Float!
    contents: String
    month: Int!
    studentName: String
  }
`;
