import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seePageLink(folder: String, pageTitle: String): [PageLink]
  }
`