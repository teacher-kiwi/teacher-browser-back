import { gql } from "apollo-server-core";

export default gql`
  input DateMonth {
    date: Float!
    month: Int!
  }

  type Mutation {
    createManyAttendance(
      userEmail: String!
      studentId: String!
      type: String!
      contents: String
      dateMonthArr: [DateMonth]!
    ): mutationResult
  }
`;
