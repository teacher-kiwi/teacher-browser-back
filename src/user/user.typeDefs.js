import { gql } from "apollo-server-core";

export default gql`
  type Link {
    siteName: String
    memo: String
  }
  type DDay {
    title: String
    date: Float
    ID: Float
  }
  type homeLink {
    title: String
    link: String
    ID: Float
  }

  type User {
    _id: ID!
    email: String!
    password: String
    schoolName: String
    schoolCode: String
    areaCode: String
    schoolAdress: String
    studentNum: Int
    bgTheme: String
    allergy: [Int]
    tag: [String]
    favoriteNews: [String]
    link: [Link]
    agreePolicy: Boolean
    dDay: [DDay]
    isMoveDDay: Boolean
    homeLinks: [homeLink]
  }
`;
