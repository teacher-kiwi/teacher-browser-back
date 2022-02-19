import TimetableData from "../../models/timetableData";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    setTimetableData: protectedMutationResovler(async (_, { teacherEmail, timetableData }, { loggedInUser }) => {
      timetableData.forEach(async (data) => {
        const timetableData = await TimetableData.findOne({ teacherEmail, day: data.day, time: data.time });
        if (timetableData) {
          await TimetableData.updateOne(
            { teacherEmail, day: data.day, time: data.time },
            { teacherEmail, day: data.day, time: data.time, subName: data.subName, color: data.color, memo: data.memo }
          );
        } else {
          await TimetableData.create({ teacherEmail, day: data.day, time: data.time, subName: data.subName, color: data.color, memo: data.memo });
        }
      });
      return { ok: true };
    }),
  },
};
