import TimetableTime from "../../models/timetableTime";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    setTimetableTime: protectedMutationResovler(
      async (_, { teacherEmail, start1, end1, start2, end2, start3, end3, start4, end4, start5, end5, start6, end6 }, { loggedInUser }) => {
        const time = await TimetableTime.findOne({ teacherEmail });
        console.log(time);
        if (time) {
          await TimetableTime.updateOne({ teacherEmail }, { start1, end1, start2, end2, start3, end3, start4, end4, start5, end5, start6, end6 });
          return { ok: true };
        } else {
          await TimetableTime.create({ teacherEmail, start1, end1, start2, end2, start3, end3, start4, end4, start5, end5, start6, end6 });
          return { ok: true };
        }
      }
    ),
  },
};
