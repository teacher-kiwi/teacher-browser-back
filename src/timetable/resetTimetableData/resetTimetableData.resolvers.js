import TimetableData from "../../models/timetableData";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    resetTimetableData: protectedMutationResovler(async (_, { teacherEmail, resetIndex }, { loggedInUser }) => {
      await TimetableData.updateOne(
        {
          teacherEmail,
          index: resetIndex,
        },
        {
          subName: null,
          color: null,
          memo: null,
        },
      );
      return {
        ok: true,
      };
    }),
  },
};
