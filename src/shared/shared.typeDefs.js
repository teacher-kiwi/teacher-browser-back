import { gql } from "apollo-server-core";

export default gql`
  type mutationResult {
    ok: Boolean!
    error: String
  }
  type loginResult {
    ok: Boolean!
    token: String
    error: String
  }
`