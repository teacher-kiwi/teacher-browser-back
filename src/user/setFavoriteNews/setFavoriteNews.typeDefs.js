import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    setFavoriteNews(news: String!, userEmail: String!): mutationResult
  }
`;
