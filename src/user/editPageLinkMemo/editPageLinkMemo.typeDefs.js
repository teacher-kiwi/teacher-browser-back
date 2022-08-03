import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    editPageLinkMemo(userEmail: String!, memo: String!, pageTitle: String!): mutationResult
  }
`;
