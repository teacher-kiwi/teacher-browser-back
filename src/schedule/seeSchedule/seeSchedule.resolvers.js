import Schedule from "../../models/schedule";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeSchedule: protectedQueryResovler(async (_, { id }, { loggedInUser }) => {
      if (id) {
        return await Schedule.find({ userEmail: loggedInUser.email, _id: id })
      }
      return await Schedule.find({ userEmail: loggedInUser.email }).sort({ _id: 1 });
    }),
  },
};
