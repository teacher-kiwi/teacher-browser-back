import Schedule from "../../models/schedule";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editSchedule: protectedMutationResovler(
      async (_, { scheduleId, schedule, userEmail, startDate, endDate, contents, color, months }, { loggedInUser }) => {
        const delSchedule = await Schedule.findOne({ userEmail, _id: scheduleId });
        await Schedule.deleteOne({ userEmail, _id: scheduleId });

        const termDay = (endDate - startDate) / 1000 / 60 / 60 / 24 - 1;
        const term = [];
        for (let i = 0; i < termDay; i++) {
          const day = startDate + 86400000 * (i + 1);
          term.push(day);
        }
        const allDate = [startDate, ...term, endDate];

        let enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        for (let i = 0; i < allDate.length; i++) {
          const includesSchedule = await Schedule.find({
            userEmail: loggedInUser.email,
            allDate: allDate[i],
          });
          includesSchedule.forEach((item) => {
            enableSortArr = enableSortArr.filter((sort) => sort !== item.sort);
          });
        }

        if (enableSortArr.length === 0) {
          return {
            ok: false,
            error: "생성된 일정이 너무 많습니다. 해당 기간의 일정을 지운 후 다시 생성하세요! 😭",
          };
        }

        const enableSort = Math.min(...enableSortArr);

        const newSchedule = await Schedule.create({
          schedule,
          userEmail,
          color,
          startDate,
          endDate,
          term,
          allDate,
          months,
          sort: enableSort,
          ...(contents && { contents }),
        });
        return {
          ok: true,
          schedule: newSchedule,
          delSchedule,
        };
      },
    ),
  },
};
