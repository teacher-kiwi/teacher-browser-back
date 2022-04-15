import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    toggleIsMoveDDay: protectedMutationResovler(async (_, { userEmail }) => {
      const user = await User.findOne({ email: userEmail });
      console.log(user);
      if (user.isMoveDDay) {
        await User.updateOne({ email: userEmail }, { isMoveDDay: false });
      } else {
        await User.updateOne({ email: userEmail }, { isMoveDDay: true });
      }
      return {
        ok: true,
      };
    }),
  },
};
