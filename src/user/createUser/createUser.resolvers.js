import User from "../../models/user";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createUser: async (_, { email, password }) => {
      const existUser = await User.findOne({ email }).exec();
      if (existUser) return { ok: false, error: "이메일이 존재합니다." };

      if (password.length < 7 || password.length > 17)
        return { ok: false, error: "비밀번호는 8자리 이상 16자리 이하만 가능합니다." };
      if (password.match(/[^a-zA-Z0-9`~!@@#$%^&*|₩₩₩'₩";:₩/?]/) !== null)
        return { ok: false, error: "비밀번호는 숫자와 영문 또는 특수문자만 입력할 수 있습니다." };

      const num = password.search(/[0-9]/g);
      if (num < 0) return { ok: false, error: "비밀번호는 숫자 1자 이상을 포함해야 합니다." };

      const spe = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      if (spe < 1) return { ok: false, error: "비밀번호는 특수문자 2자 이상을 포함해야 합니다." };

      const uglyPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: uglyPassword });
      await user.save();

      return { ok: true };
    },
  },
};
