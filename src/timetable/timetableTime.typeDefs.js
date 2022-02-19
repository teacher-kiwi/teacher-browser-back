import { gql } from "apollo-server-core";

export default gql`
  type TimetableTime {
    _id: ID
    teacherEmail: String
    start1: String
    end1: String
    start2: String
    end2: String
    start3: String
    end3: String
    start4: String
    end4: String
    start5: String
    end5: String
    start6: String
    end6: String
  }
`;
