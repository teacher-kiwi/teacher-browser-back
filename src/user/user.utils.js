import jwt from "jsonwebtoken"
import User from "../models/user"

export const getUser = async (token) => {
  if (!token) {
    return null
  }
  const { email } = await jwt.verify(token, process.env.SECRET_KEY)
  const user = await User.findOne({ email })
  if (!user) {
    return false
  } else {
    return user
  }
}

export const protectedResovler = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다."
    }
  }
  return ourResolver(root, args, context, info)
}