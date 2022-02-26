import User from "../../models/user";
import jwt from "jsonwebtoken";
import axios from "axios";

export default {
  Mutation: {
    kakaoLogin: async (_, { uri, code }) => {
      const url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${uri}&code=${code}`;
      const config = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
      const result = await axios
        .post(url, config)
        .then(({ data }) => {
          return axios({
            url: `https://kapi.kakao.com/v2/user/me`,
            headers: { Authorization: `Bearer ${data.access_token}` },
          }).then(async ({ data }) => {
            if (data.kakao_account.email) {
              const user = await User.findOne({ email: data.kakao_account.email });
              if (!user) await User.create({ email: data.kakao_account.email });
              const token = await jwt.sign({ email: data.kakao_account.email }, process.env.SECRET_KEY);
              return { ok: true, token };
            } else return { ok: true };
          });
        })
        .catch(({ response }) => {
          console.log("카카오로그인 실패", response.data.error_description);
          return { ok: false, error: response.data.error_description };
        });

      return result;
    },
  },
};
