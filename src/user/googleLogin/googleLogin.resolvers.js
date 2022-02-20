import User from "../../models/user";
import jwt from "jsonwebtoken";
import axios from "axios";

export default {
  Mutation: {
    googleLogin: async (_, { access_token }) => {
      return axios(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`).then(async (data) => {
        if (data.data) {
          const user = await User.findOne({ email: data.data.email });
          if (!user) await User.create({ email: data.data.email });
          const token = await jwt.sign({ email: data.data.email }, process.env.SECRET_KEY);
          return { ok: true, token };
        } else if (data.error) {
          return { ok: false, error: data.error.status };
        }
      });
    },
  },
};
