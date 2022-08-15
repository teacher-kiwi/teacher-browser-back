const jwt = require("jsonwebtoken");
const User = require("../models/User");

const utils = {
  getUser: async (token) => {
    if (!token) return null;
    const { email } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email });
    if (!user) return null;
    return user;
  },

  protectedResolver: (ourResolver) => async (root, args, context, info) => {
    if (!context.loggedInUser) throw new Error("로그인이 필요합니다.");
    const user = await User.findOne({ email: args.teacherEmail || args.userEmail });
    if (!user) throw new Error("사용자를 찾을 수 없습니다.");
    if (user.email !== context.loggedInUser.email) throw new Error("권한이 없습니다.");
    return ourResolver(root, args, context, info);
  },
};

module.exports = utils;
