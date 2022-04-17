import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    deleteDDay: protectedMutationResovler(async (_, { userEmail, ID }) => {
      const user = await User.findOne({ email: userEmail });
      const userDDay = user.dDay;
      const newUserDDay = userDDay.filter((item) => item.ID !== ID);
      await User.updateOne({ email: userEmail }, { dDay: newUserDDay });
      return {
        ok: true,
      };
    }),
  },
};
