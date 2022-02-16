import { gql } from "apollo-server-core";

export default gql`
  type Schedule {
    _id: ID!
    schedule: String!
    userEmail: String!
    contents: String
    startDate: Float!
    endDate: Float!
    color: String!
    term: [Float]!
    allDate: [Float]!
    sort: Int!
  }
`