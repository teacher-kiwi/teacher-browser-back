import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    createDDay: protectedMutationResovler(
      async (_, { userEmail, title, date, ID }) => {
        const user = await User.findOne({ email: userEmail });
        const userDDay = user.dDay;
        const newDDay = [...userDDay, { title, date, ID }];

        await User.updateOne({ email: userEmail }, { dDay: newDDay });
        return {
          ok: true,
        };
      }
    ),
  },
};
