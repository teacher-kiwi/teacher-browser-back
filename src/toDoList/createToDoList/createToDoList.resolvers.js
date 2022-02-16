import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createToDoList: protectedMutationResovler(async (_, { toDo, userEmail, startDate, endDate, contents, star }, { loggedInUser }) => {

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
        await ToDoList.create({
          toDo,
          userEmail,
          star,
          startDate: getStartDate,
          endDate: getEndDate,
          allDate,
          ...(contents && { contents })
        })
        return {
          ok: true
        }
      }

      await ToDoList.create({
        toDo,
        userEmail,
        star,
        ...(contents && { contents })
      });
      return { ok: true };
    }),
  },
};
