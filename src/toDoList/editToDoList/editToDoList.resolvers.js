import ToDoList from "../../models/toDoList";
import { setKrTime } from "../../shared/dateFn";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editToDoList: protectedMutationResovler(async (_, { _id, userEmail, toDo, star, startDate, endDate, contents }, { loggedInUser }) => {

      if (startDate) {

        const getStartDate = setKrTime(parseInt(startDate))
        const getEndDate = setKrTime(parseInt(endDate))

        let allDate = null

        if (getStartDate === getEndDate) {
          allDate = [getStartDate]
        } else {
          const term = []
          const termDay = ((getEndDate - getStartDate) / 1000 / 60 / 60 / 24) - 1;
          for (let i = 0; i < termDay; i++) {
            const day = getStartDate + (86400000 * (i + 1))
            term.push(day)
          }
          allDate = [getStartDate, ...term, getEndDate]
        }
        await ToDoList.updateOne(
          { _id, userEmail },
          {
            toDo,
            ...(contents ? { contents } : { contents: null }),
            star,
            ...(startDate ? { startDate: getStartDate } : { startDate: null }),
            ...(endDate ? { endDate: getEndDate } : { endDate: null }),
            allDate,
          });
      } else {
        await ToDoList.updateOne(
          { _id, userEmail },
          {
            toDo,
            ...(contents ? { contents } : { contents: null }),
            star,
            startDate: null,
            endDate: null,
            allDate: []
          });
      }

      return { ok: true };
    }),
  },
};
