import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editSchedule(
      scheduleId: ID!
      schedule: String!
      userEmail: String!
      startDate: Float!
      endDate: Float!
      months: [Int]!
      contents: String
      color: String!
    ): scheduleMutationResult
  }
`;
