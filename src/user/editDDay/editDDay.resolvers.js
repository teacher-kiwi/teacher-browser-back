import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    editDDay: protectedMutationResovler(
      async (_, { userEmail, ID, title, date }) => {
        const user = await User.findOne({ email: userEmail });
        const userDDay = user.dDay;
        // const newUserDDay = userDDay.map((item) => {
        //   if (item.ID === ID) {
        //     return { title, date, ID };
        //   } else {
        //     return item;
        //   }
        // });
        const targetIndex = userDDay.findIndex((item) => item.ID === ID);
        const newDDay = [
          ...userDDay.slice(0, targetIndex),
          { title, date, ID },
          ...userDDay.slice(targetIndex + 1),
        ];
        await User.updateOne({ email: userEmail }, { dDay: newDDay });
        return {
          ok: true,
        };
      }
    ),
  },
};
