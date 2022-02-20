import User from "../../models/user";
import jwt from "jsonwebtoken";
import axios from "axios";

export default {
  Mutation: {
    naverLogin: async (_, { code, state }) => {
      const result = await axios(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`
      ).then(({ data }) => {
        if (data.access_token) {
          return axios({
            method: "get",
            url: `https://openapi.naver.com/v1/nid/me`,
            headers: { Authorization: `Bearer ${data.access_token}` },
          }).then(async ({ data: { response } }) => {
            const user = await User.findOne({ email: response.email });
            if (!user) await User.create({ email: response.email });
            const token = await jwt.sign({ email: response.email }, process.env.SECRET_KEY);
            return { ok: true, token };
          });
        } else if (data.error) {
          return { ok: false, error: data.error_description };
        }
      });

      return result;
    },
  },
};
