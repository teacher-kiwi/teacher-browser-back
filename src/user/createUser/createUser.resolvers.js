
import User from "../../models/user"

export default {
  Mutation: {
    createUser: async (_, { email, password }) => {
      const user = new User({
        email,
        password
      })
      await user.save()
      return {
        ok: true
      }
    }
  }
}