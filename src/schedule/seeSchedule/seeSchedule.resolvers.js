import Schedule from "../../models/schedule";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeSchedule: protectedQueryResovler(async (_, { id, date }, { loggedInUser }) => {
      if (id) {
        return await Schedule.find({ userEmail: loggedInUser.email, _id: id })
      }
      return await Schedule.find({ userEmail: loggedInUser.email, allDate: new Date(date).setHours(0, 0, 0, 0) }).sort({ sort: 1 });
    }),
  },
};
