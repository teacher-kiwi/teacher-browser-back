const Schedule = require("../../models/Schedule");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  Query: {
    seeSchedule: protectedQuery(async (_, { scheduleId, month, date }, { loggedInUser }) => {
      if (scheduleId) return await Schedule.find({ userEmail: loggedInUser.email, _id: scheduleId });

      if (month) {
        return await Schedule.find({
          userEmail: loggedInUser.email,
          $or: [{ months: month }, { months: month - 1 }, { months: month + 1 }],
        });
      }
      // if (dateArr) {
      //   let returnSchedule = []
      //   for (let i = 0; i < dateArr.length; i++) {
      //     const schedule = await Schedule.find({ userEmail: loggedInUser.email, allDate: dateArr[i] }).sort({ sort: 1 });
      //     if (schedule.length === 0) {
      //     } else {
      //       schedule.forEach(item => { returnSchedule.push(item) })
      //     }
      //   }
      //   const map = new Map()
      //   for (const item of returnSchedule) {
      //     map.set(JSON.stringify(item), item);
      //   }
      //   returnSchedule = [...map.values()]
      //   return returnSchedule
      // }
      if (date) return await Schedule.find({ userEmail: loggedInUser.email, allDate: date }).sort({ sort: 1 });
    }),

    enableSortNum: protectedQuery(async (_, { scheduleId, userEmail }) => {
      const schedule = await Schedule.findOne({ userEmail, _id: scheduleId });
      let enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      for (let i = 0; i < schedule.allDate.length; i++) {
        const includesSchedule = await Schedule.find({ userEmail, allDate: schedule.allDate[i] });
        includesSchedule.forEach((item) => {
          enableSortArr = enableSortArr.filter((sort) => sort !== item.sort);
        });
      }
      const enableSort = Math.min(...enableSortArr);
      return enableSort < schedule.sort ? enableSort : 0;
    }),
  },

  Mutation: {
    createSchedule: protectedMutation(
      async (_, { schedule, userEmail, startDate, endDate, contents, color, months }, { loggedInUser }) => {
        const termDay = (endDate - startDate) / 1000 / 60 / 60 / 24 - 1;
        const term = [];
        for (let i = 0; i < termDay; i++) {
          const day = startDate + 86400000 * (i + 1);
          term.push(day);
        }
        const allDate = [startDate, ...term, endDate];

        let enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
        for (let i = 0; i < allDate.length; i++) {
          const includesSchedule = await Schedule.find({ userEmail: loggedInUser.email, allDate: allDate[i] });
          includesSchedule.forEach((item) => {
            enableSortArr = enableSortArr.filter((sort) => sort !== item.sort);
          });
        }

        if (enableSortArr.length === 0)
          return { ok: false, error: "생성된 일정이 너무 많습니다. 해당 기간의 일정을 지운 후 다시 생성하세요! 😭" };

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
        return { ok: true, schedule: newSchedule };
      },
    ),

    editSchedule: protectedMutation(
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
          const includesSchedule = await Schedule.find({ userEmail: loggedInUser.email, allDate: allDate[i] });
          includesSchedule.forEach((item) => {
            enableSortArr = enableSortArr.filter((sort) => sort !== item.sort);
          });
        }

        if (enableSortArr.length === 0)
          return { ok: false, error: "생성된 일정이 너무 많습니다. 해당 기간의 일정을 지운 후 다시 생성하세요! 😭" };

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
        return { ok: true, schedule: newSchedule, delSchedule };
      },
    ),

    updateScheduleSort: protectedMutation(async (_, { userEmail, scheduleId, sort }) => {
      await Schedule.updateOne({ userEmail, _id: scheduleId }, { sort });
      return { ok: true };
    }),

    deleteSchedule: protectedMutation(async (_, { scheduleId, userEmail }) => {
      const delSchedule = await Schedule.findOne({ userEmail, _id: scheduleId });
      await Schedule.deleteOne({ userEmail, _id: scheduleId });
      return { ok: true, schedule: delSchedule };
    }),
  },
};

module.exports = resolver;
