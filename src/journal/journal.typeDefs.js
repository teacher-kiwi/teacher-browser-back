import { gql } from "apollo-server-core";

export default gql`
  type Journal {
    _id: ID!
    ownerId: ID!
    teacherEmail: String!
    date: String
    text: String
  }
`;
