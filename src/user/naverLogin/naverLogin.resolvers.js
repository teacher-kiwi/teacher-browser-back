import User from "../../models/user";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    naverLogin: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) await User.create({ email, tag: ["남학생", "여학생", "홀수", "짝수"] });
      const token = await jwt.sign({ email }, process.env.SECRET_KEY);
      return { ok: true, token };
    },
  },
};
