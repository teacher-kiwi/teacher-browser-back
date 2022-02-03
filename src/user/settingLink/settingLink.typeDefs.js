import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    settingLink(userEmail: String!, link: String, memo: String): mutationResult
  }
`