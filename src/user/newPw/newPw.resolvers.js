import User from "../../models/user";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    newPw: async (_, { userEmail, certificate, password }) => {
      // userEmail만 입력한 경우
      if (userEmail && !certificate) {
        const email = await User.findOne({ email: userEmail });
        //
        // 가입된 정보가 없을 경우 에러 출력
        if (!email) return { ok: false, error: "가입된 email 정보가 없습니다." };
        //
        // password 정보가 없을 경우 에러 출력
        if (!email.password) return { ok: false, error: "다른 웹사이트에서 권한을 받은 계정입니다." };
        //
        // 인증코드 생성
        let pw = "";
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-=_+";
        const pwLength = 10;
        for (let i = 0; i < pwLength; i++) {
          const randomNum = Math.floor(Math.random() * chars.length);
          pw += chars[randomNum];
        }
        //
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
        //
        // DB에 인증코드 저장
        const uglyPassword = await bcrypt.hash(pw, 10);
        await User.updateOne({ email: userEmail }, { certificate: uglyPassword });
      } else if (userEmail && certificate && password) {
        const { certificate: hasCertificate } = await User.findOne({ email: userEmail });
        //
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
