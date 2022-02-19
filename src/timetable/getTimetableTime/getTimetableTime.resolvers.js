import TimetableTime from "../../models/timetableTime";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    getTimetableTime: protectedQueryResovler(async (_, __, { loggedInUser }) => {
      const time = await TimetableTime.findOne({ teacherEmail: loggedInUser.email });
      if (time) return time;
      else return { _id: null, teacherEmail: loggedInUser.email };
    }),
  },
};
