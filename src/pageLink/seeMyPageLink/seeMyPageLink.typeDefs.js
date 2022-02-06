import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeMyPageLink(userEmail: String!): [PageLink]
  }
`