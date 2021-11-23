import User from "../../models/user"


export default {
  Query: {
    seeUser: async () => {
      return await User.find()
    }
  }
}