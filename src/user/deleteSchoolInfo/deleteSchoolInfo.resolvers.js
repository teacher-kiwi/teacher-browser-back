import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    deleteSchoolInfo: protectedMutationResovler(async (_, { userEmail }, { loggedInUser }) => {
      await User.updateOne(
        { email: userEmail },
        {
          schoolName: "",
          schoolCode: "",
          areaCode: "",
          schoolAdress: "",
        }
      );
      return { ok: true };
    }),
  },
};
