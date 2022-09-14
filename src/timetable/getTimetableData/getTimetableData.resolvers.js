import TimetableData from "../../models/timetableData";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    getTimetableData: protectedQueryResovler(async (_, { day, index }, { loggedInUser }) => {
      if (day) {
        const timetableData = await TimetableData.find({ teacherEmail: loggedInUser.email, day }).sort({ index: 1 });
        if (timetableData.length !== 0) {
          return timetableData;
        } else {
          for (let i = 0; i < 30; i++) {
            await TimetableData.create({ teacherEmail: loggedInUser.email, index: i, day: i % 5 });
          }
          const newTimetableData = await TimetableData.find({ teacherEmail: loggedInUser.email, day }).sort({
            index: 1,
          });
          return newTimetableData;
        }
      }
      if (index) {
        return await TimetableData.find({ teacherEmail: loggedInUser.email, index });
      }
      const timetableData = await TimetableData.find({ teacherEmail: loggedInUser.email }).sort({ index: 1 });
      if (timetableData.length !== 0) {
        return timetableData;
      } else {
        for (let i = 0; i < 30; i++) {
          await TimetableData.create({ teacherEmail: loggedInUser.email, index: i, day: i % 5 });
        }
        const newTimetableData = await TimetableData.find({ teacherEmail: loggedInUser.email }).sort({ index: 1 });
        return newTimetableData;
      }
    }),
  },
};
