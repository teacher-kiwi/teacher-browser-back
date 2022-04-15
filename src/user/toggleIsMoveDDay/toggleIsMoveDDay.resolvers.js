import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    toggleIsMoveDDay: protectedMutationResovler(
      async (_, { userEmail, type }) => {
        if (type === "stop") {
          await User.updateOne({ email: userEmail }, { isMoveDDay: false });
        } else {
          await User.updateOne({ email: userEmail }, { isMoveDDay: true });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
