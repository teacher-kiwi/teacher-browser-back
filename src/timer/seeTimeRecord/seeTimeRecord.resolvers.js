import TimeRecord from "../../models/timeRecord";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeTimeRecord: protectedQueryResovler(async (_, __, { loggedInUser }) => {
      return await TimeRecord.findOne({ userEmail: loggedInUser.email });
    }),
  },
};
