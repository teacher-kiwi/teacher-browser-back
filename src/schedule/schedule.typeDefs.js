import { gql } from "apollo-server-core";

export default gql`
  type Schedule {
    schedule: String!
    userEmail: String!
    contents: String
    startDate: String!
    endDate: String!
    color: String!
    term: [String]!
    allDate: [String]!
    sort: Int!
  }
`