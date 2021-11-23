import User from "../../models/user"

export default {
  Mutation: {
    deleteUser: async (_, { email }) => {
      await User.findOneAndDelete({ email })
      return {
        ok: true
      }
    }
  }
}