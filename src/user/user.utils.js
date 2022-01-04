import jwt from "jsonwebtoken";
import User from "../models/user";

export const getUser = async (token) => {
  if (!token) return null;
  const { email } = await jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findOne({ email });
  if (!user) return false;
  else return user;
};

export const protectedMutationResovler = (ourResolver) => async (root, args, context, info) => {
  if (!context.loggedInUser) return { ok: false, error: "로그인이 필요합니다." };
  const user = await User.findOne({ email: args.teacherEmail || args.userEmail });
  if (!user) return { ok: false, error: "사용자를 찾을 수 없습니다." };
  if (user.email !== context.loggedInUser.email) return { ok: false, error: "권한이 없습니다." };
  return ourResolver(root, args, context, info);
};

export const protectedQueryResovler = (ourResolver) => async (root, args, context, info) => {
  if (!context.loggedInUser) return { ok: false, error: "로그인이 필요합니다." };
  return ourResolver(root, args, context, info);
};
