import { gql } from "apollo-server-core";

export default gql`
  type timeData {
    timeId: Int!
    minutes: Int!
    seconds: Int!
    milliseconds: Int!
  }

  type TimeRecord {
    userEmail: String!
    timeRecord: [timeData]
  }
`;
