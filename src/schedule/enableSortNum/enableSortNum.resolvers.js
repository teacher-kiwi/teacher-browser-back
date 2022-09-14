import Schedule from "../../models/schedule";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    enableSortNum: protectedQueryResovler(async (_, { scheduleId, userEmail }) => {
      const schedule = await Schedule.findOne({ userEmail, _id: scheduleId });
      let enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      for (let i = 0; i < schedule.allDate.length; i++) {
        const includesSchedule = await Schedule.find({
          userEmail,
          allDate: schedule.allDate[i],
        });
        includesSchedule.forEach((item) => {
          enableSortArr = enableSortArr.filter((sort) => sort !== item.sort);
        });
      }
      const enableSort = Math.min(...enableSortArr);
      if (enableSort < schedule.sort) {
        return enableSort;
      } else {
        return 0;
      }
    }),
  },
};
