import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteSchedule(userEmail: String!, scheduleId: ID!): mutationResult
  }
`