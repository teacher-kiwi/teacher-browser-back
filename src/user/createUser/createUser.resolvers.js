
import User from "../../models/user"

export default {
  Mutation: {
    createUser: async (_, { email, password }) => {
      const existUser = await User.findOne({ email }).exec()
      if (existUser) {
        return {
          ok: false,
          error: "이메일이 존재합니다."
        }
      }
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