const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const resolver = {
  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) return { ok: false, error: "사용자를 찾을 수 없습니다." };

      const passwordOK = await bcrypt.compare(password, user.password);
      if (!passwordOK) return { ok: false, error: "비밀번호가 틀립니다." };

      // DB에 인증코드 값이 있는 경우 null로 수정
      await User.updateOne({ email }, { certificate: null });

      const token = await jwt.sign({ email: user.email }, process.env.SECRET_KEY);
      return { ok: true, token };
    },

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

    naverLogin: async (_, { code, state }) => {
      const result = await axios(
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`,
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

module.exports = resolver;
