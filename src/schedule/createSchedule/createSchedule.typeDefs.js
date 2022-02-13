import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createSchedule(
      schedule: String!
      userEmail: String!
      startDate: String!
      endDate: String!
      contents: String
      color: String!
    ): mutationResult
  }
`;
