import Schedule from "../../models/schedule";
import { setKrTime } from "../../shared/dateFn";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeSchedule: protectedQueryResovler(async (_, { scheduleId, dateArr, date }, { loggedInUser }) => {
      if (scheduleId) {
        return await Schedule.find({ userEmail: loggedInUser.email, _id: scheduleId })
      }
      if (dateArr) {
        let returnSchedule = []
        for (let i = 0; i < dateArr.length; i++) {
          const schedule = await Schedule.find({ userEmail: loggedInUser.email, allDate: setKrTime(dateArr[i]) }).sort({ sort: 1 });
          if (schedule.length === 0) {

          } else {
            schedule.forEach(item => {
              returnSchedule.push(item)
            })
          }
        }
        const map = new Map()
        for (const item of returnSchedule) {
          map.set(JSON.stringify(item), item);
        }
        returnSchedule = [...map.values()]
        return returnSchedule
      }
      if (date) {
        return await Schedule.find({ userEmail: loggedInUser.email, allDate: setKrTime(date) }).sort({ sort: 1 });
      }
    }),
  },
};
