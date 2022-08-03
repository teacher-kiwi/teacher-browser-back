import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateScheduleSort(userEmail: String!, scheduleId: ID!, sort: Int!): mutationResult
  }
`;
