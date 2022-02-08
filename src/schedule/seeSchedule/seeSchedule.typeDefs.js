import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeSchedule(id: String): [Schedule]
  }
`;
