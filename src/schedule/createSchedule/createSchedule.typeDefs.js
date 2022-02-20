import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createSchedule(
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
