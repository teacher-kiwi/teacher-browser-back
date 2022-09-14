import { gql } from "apollo-server-core";

export default gql`
  type Query {
    enableSortNum(scheduleId: String!, userEmail: String!): Int
  }
`;
