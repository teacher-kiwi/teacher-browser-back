const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { protectedResolver } = require("../../utils/_utils");

const resolver = {
  Query: {
    checkPw: protectedResolver(async (_, { userEmail, password }) => {
      const userData = await User.findOne({ email: userEmail });
      const hasPw = userData.password ? true : false;
      if (!password) {
        if (hasPw) return { ok: true };
        else return { ok: false, error: "다른 웹사이트에서 권한을 받은 계정입니다." };
      } else {
        if (hasPw) {
          const passwordOk = await bcrypt.compare(password, userData.password);
          if (passwordOk) return { ok: true };
          else return { ok: false, error: "비밀번호가 틀립니다." };
        } else {
          return { ok: false, error: "다른 웹사이트에서 권한을 받은 계정입니다." };
        }
      }
    }),
  },

  Mutation: {
    changePw: protectedResolver(async (_, { userEmail, password, newPassword }) => {
      const user = await User.findOne({ email: userEmail });
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) return { ok: false, error: "비밀번호가 틀립니다." };

      if (newPassword.length < 7 || newPassword.length > 17)
        return { ok: false, error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다." };
      if (newPassword.match(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/) !== null)
        return { ok: false, error: "비밀번호는 숫자와 영문 또는 특수문자만 입력할 수 있습니다." };

      const num = newPassword.search(/[0-9]/g);
      if (num < 0) return { ok: false, error: "비밀번호는 숫자 1자 이상을 포함해야 합니다." };

      const spe = newPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      if (spe < 1) return { ok: false, error: "비밀번호는 특수문자 2자 이상을 포함해야 합니다." };

      const uglyPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne({ email: userEmail }, { password: uglyPassword });
      return { ok: true };
    }),

    newPw: async (_, { userEmail, certificate, password }) => {
      // userEmail만 입력한 경우
      if (userEmail && !certificate) {
        const email = await User.findOne({ email: userEmail });

        // 가입된 정보가 없을 경우 에러 출력
        if (!email) return { ok: false, error: "가입된 email 정보가 없습니다." };

        // password 정보가 없을 경우 에러 출력
        if (!email.password) return { ok: false, error: "다른 웹사이트에서 권한을 받은 계정입니다." };

        // 인증코드 생성
        let pw = "";
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-=_+";
        const pwLength = 10;
        for (let i = 0; i < pwLength; i++) {
          const randomNum = Math.floor(Math.random() * chars.length);
          pw += chars[randomNum];
        }

        // 인증코드 메일로 발송
        const mailConfig = {
          service: "Naver",
          host: "smtp.naver.com",
          port: 587,
          auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASSWORD,
          },
        };
        let message = {
          from: process.env.MAIL_EMAIL,
          to: userEmail,
          subject: "teacher-browser 인증 코드 메일입니다.",
          html: `<p>인증코드는 <strong>${pw}</strong>입니다.</p>`,
        };
        let transporter = nodemailer.createTransport(mailConfig);
        await transporter.sendMail(message);

        // DB에 인증코드 저장
        const uglyPassword = await bcrypt.hash(pw, 10);
        await User.updateOne({ email: userEmail }, { certificate: uglyPassword });
      } else if (userEmail && certificate && password) {
        const { certificate: hasCertificate } = await User.findOne({ email: userEmail });

        // 저장된 인증코드가 없는 경우 에러 출력
        if (!hasCertificate) return { ok: false, error: "인증코드를 다시 발송해주십시오." };
        const isCorrectKey = await bcrypt.compare(certificate, hasCertificate);
        if (isCorrectKey) {
          const uglyPassword = await bcrypt.hash(password, 10);
          await User.updateOne({ email: userEmail }, { password: uglyPassword, certificate: null });
        } else return { ok: false, error: "인증코드가 틀렸습니다." };
      }

      return { ok: true };
    },
  },
};

module.exports = resolver;
