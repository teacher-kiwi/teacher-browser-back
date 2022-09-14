import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    updateUser: protectedMutationResovler(
      async (
        _,
        { userEmail, schoolName, schoolCode, areaCode, schoolAdress, bgTheme, alergy, agreePolicy },
        { loggedInUser },
      ) => {
        await User.updateOne(
          { email: userEmail },
          {
            schoolName,
            schoolCode,
            areaCode,
            schoolAdress,
            bgTheme,
            alergy,
            agreePolicy,
          },
        );
        return { ok: true };
      },
    ),
  },
};
