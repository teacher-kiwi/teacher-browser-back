import { gql } from "apollo-server-core";

export default gql`
  type User {
    _id: ID!
    email: String!
    password: String
    schoolName: String
    schoolCode: String
    areaCode: String
    schoolAdress: String
    studentNum: Int
  }
`