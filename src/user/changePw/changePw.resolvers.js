import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    changePw: protectedMutationResovler(async (_, { userEmail, password, newPassword }, { loggedInUser }) => {
      const user = await User.findOne({ email: userEmail });
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) return { ok: false, error: "비밀번호가 틀립니다." };

      if (newPassword.length < 7 || newPassword.length > 17) return { ok: false, error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다." };
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
  },
};
