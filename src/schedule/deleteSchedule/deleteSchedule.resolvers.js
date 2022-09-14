import Schedule from "../../models/schedule";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteSchedule: protectedMutationResovler(async (_, { scheduleId, userEmail }, { loggedInUser }) => {
      const delSchedule = await Schedule.findOne({ userEmail, _id: scheduleId });
      await Schedule.deleteOne({ userEmail, _id: scheduleId });
      return {
        ok: true,
        schedule: delSchedule,
      };
    }),
  },
};
