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
  type scheduleMutationResult {
    ok: Boolean!
    schedule: Schedule!,
    delSchedule: Schedule,
    error: String
  }
  type enableSortNumResult {
    ok: Boolean
    num: Int
    error: String
  }
`