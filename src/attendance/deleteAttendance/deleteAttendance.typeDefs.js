import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteAttendance(userEmail: String!, attendId: String!): mutationResult
  }
`;
