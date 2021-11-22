import user from "../../models/user"


export default {
  Query: {
    seeUser: async () => {
      return await user.find()
    }
  }
}