import Schedule from "../../models/schedule";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createSchedule: protectedMutationResovler(async (_, { schedule, userEmail, startDate, endDate, contents, color }, { loggedInUser }) => {
      await Schedule.create({
        schedule,
        userEmail,
        color,
        startDate,
        endDate,
        ...(contents && { contents })
      });
      return { ok: true };
    }),
  },
};
