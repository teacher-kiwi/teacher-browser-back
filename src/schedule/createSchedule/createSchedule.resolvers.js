import Schedule from "../../models/schedule";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createSchedule: protectedMutationResovler(async (_, { schedule, userEmail, startDate, endDate, contents, color }, { loggedInUser }) => {
      const getStartDate = new Date(startDate).setHours(0, 0, 0, 0)
      const getEndDate = new Date(endDate).setHours(0, 0, 0, 0)
      const termDay = ((getEndDate - getStartDate) / 1000 / 60 / 60 / 24) - 1;
      const term = []
      for (let i = 0; i < termDay; i++) {
        const day = getStartDate + (86400000 * (i + 1))
        term.push(day)
      }
      const allDate = [getStartDate, ...term, getEndDate]

      const scheduleNum = []
      for (let i = 0; i < allDate.length; i++) {
        const num = await Schedule.count({
          userEmail: loggedInUser.email,
          allDate: allDate[i]
        })
        scheduleNum.push(num)
      }

      await Schedule.create({
        schedule,
        userEmail,
        color,
        startDate: getStartDate,
        endDate: getEndDate,
        term,
        allDate,
        sort: Math.max(...scheduleNum),
        ...(contents && { contents })
      });
      return { ok: true };
    }),
  },
};
