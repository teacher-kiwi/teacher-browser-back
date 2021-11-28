import jwt from "jsonwebtoken"
import User from "../../models/user"

export default {
  Query: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email })
      if (!user) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다."
        }
      }
      // password confirm

      const token = await jwt.sign({ email: user.email }, process.env.SECRET_KEY)
      return {
        ok: true,
        token
      }
    }
  }
}