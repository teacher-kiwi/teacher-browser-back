import TimetableData from "../../models/timetableData";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    getTimetableData: protectedQueryResovler(async (_, { day }, { loggedInUser }) => {
      if (day) {
        const timetableData = await TimetableData.find({ teacherEmail: loggedInUser.email, day }).sort({ time: 1 });
        return timetableData;
      } else {
        const timetableData = await TimetableData.find({ teacherEmail: loggedInUser.email }).sort({ day: 1, time: 1 });
        return timetableData;
      }
    }),
  },
};
