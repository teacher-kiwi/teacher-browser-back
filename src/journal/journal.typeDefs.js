import { gql } from "apollo-server-core";

export default gql`
  type Journal {
    _id: ID!
    date: String
    text: String
  }
`;
