import { gql } from "apollo-server-core";

export default gql`
  type News {
    title: String
    originallink: String
    link: String
    description: String
    pubDate: String
  }

  type Query {
    getNews(search: String!, start: Int!, sort: String!): [News]
  }
`;
