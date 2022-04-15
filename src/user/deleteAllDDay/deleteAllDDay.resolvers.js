import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    deleteAllDDay: protectedMutationResovler(async (_, { userEmail }) => {
      await User.updateOne({ email: userEmail }, { dDay: [] });
      return {
        ok: true,
      };
    }),
  },
};
