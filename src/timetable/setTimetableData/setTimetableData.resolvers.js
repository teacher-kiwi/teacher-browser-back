import TimetableData from "../../models/timetableData";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    setTimetableData: protectedMutationResovler(async (_, { teacherEmail, timetableData }, { loggedInUser }) => {
      const existedTimetableData = await TimetableData.findOne({ teacherEmail });
      if (!existedTimetableData) {
        for (let i = 0; i < 30; i++) {
          await TimetableData.create({ teacherEmail, index: i, day: i % 5 });
        }
      }
      timetableData.forEach(async (data) => {
        await TimetableData.updateOne(
          { teacherEmail, index: data.index },
          { teacherEmail, index: data.index, day: data.index % 5, subName: data.subName, color: data.color, memo: data.memo }
        );
      });
      return { ok: true };
    }),
  },
};
