import Student from "../../models/student";
import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    deleteTag: protectedMutationResovler(async (_, { userEmail, tag }) => {
      await User.updateOne({ email: userEmail }, { $pull: { tag } });
      await Student.updateMany({ teacherEmail: userEmail }, { $pull: { tag } });
      return {
        ok: true,
      };
    }),
  },
};
