import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    settingLink(userEmail: String!, siteName: String!, memo: String): mutationResult
  }
`;
