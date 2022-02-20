import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeSchedule(scheduleId: String, month: Int, date: Float): [Schedule]
  }
`;
