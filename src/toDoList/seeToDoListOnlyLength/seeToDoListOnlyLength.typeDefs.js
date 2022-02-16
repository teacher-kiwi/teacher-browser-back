import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeToDoListOnlyLength(userEmail: String!, date: Float): Int
  }
`