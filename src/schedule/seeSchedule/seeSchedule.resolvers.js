import Schedule from "../../models/schedule";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeSchedule: protectedQueryResovler(async (_, { scheduleId, date }, { loggedInUser }) => {
      if (scheduleId) {
        return await Schedule.find({ userEmail: loggedInUser.email, _id: scheduleId })
      }
      return await Schedule.find({ userEmail: loggedInUser.email, allDate: new Date(date).setHours(0, 0, 0, 0) }).sort({ sort: 1 });
    }),
  },
};
