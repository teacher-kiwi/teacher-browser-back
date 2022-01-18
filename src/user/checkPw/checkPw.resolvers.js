import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";
import bcrypt from "bcrypt";

export default {
  Query: {
    checkPw: protectedMutationResovler(async (_, { userEmail, password }, { loggedInUser }) => {
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
};
