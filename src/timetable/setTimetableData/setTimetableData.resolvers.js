import TimetableData from "../../models/timetableData";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    setTimetableData: protectedMutationResovler(async (_, { teacherEmail, index, subName, color, memo }, { loggedInUser }) => {
      const existedTimetableData = await TimetableData.findOne({ teacherEmail });
      if (!existedTimetableData) {
        for (let i = 0; i < 30; i++) {
          await TimetableData.create({ teacherEmail, index: i, day: i % 5 });
        }
      }

      for (let i = 0; i < index.length; i++) {
        await TimetableData.updateOne(
          { teacherEmail, index: index[i] },
          {
            teacherEmail,
            day: index[i] % 5,
            subName,
            ...(color ? { color } : { color: null }),
            ...(memo ? { memo } : { memo: null })
          }
        );
      }

      return { ok: true };
    }),
  },
};
