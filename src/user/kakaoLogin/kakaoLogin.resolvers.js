import User from "../../models/user";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    kakaoLogin: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) await User.create({ email });
      const token = await jwt.sign({ email }, process.env.SECRET_KEY);
      return { ok: true, token };
    },
  },
};
