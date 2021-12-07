import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    updateUser(userEmail:String!, schoolName: String, schoolCode:String, areaCode:String, schoolAdress:String): mutationResult
  }
`