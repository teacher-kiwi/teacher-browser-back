import Schedule from "../../models/schedule";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeSchedule: protectedQueryResovler(async (_, { scheduleId, month, date }, { loggedInUser }) => {
      if (scheduleId) {
        return await Schedule.find({ userEmail: loggedInUser.email, _id: scheduleId });
      }
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
      //       schedule.forEach(item => {
      //         returnSchedule.push(item)
      //       })
      //     }
      //   }
      //   const map = new Map()
      //   for (const item of returnSchedule) {
      //     map.set(JSON.stringify(item), item);
      //   }
      //   returnSchedule = [...map.values()]
      //   return returnSchedule
      // }
      if (date) {
        return await Schedule.find({ userEmail: loggedInUser.email, allDate: date }).sort({ sort: 1 });
      }
    }),
  },
};
