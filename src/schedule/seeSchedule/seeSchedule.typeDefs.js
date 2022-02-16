import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeSchedule(scheduleId: String, dateArr: [Float], date: Float): [Schedule]
  }
`;
