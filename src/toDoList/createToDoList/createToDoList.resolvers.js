import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createToDoList: protectedMutationResovler(async (_, { toDo, userEmail, startDate, endDate, contents, star }, { loggedInUser }) => {

      if (startDate) {
        const getStartDate = new Date(startDate).setHours(0, 0, 0, 0)
        const getEndDate = new Date(endDate).setHours(0, 0, 0, 0)
        const termDay = ((getEndDate - getStartDate) / 1000 / 60 / 60 / 24) - 1;
        const term = []
        for (let i = 0; i < termDay; i++) {
          const day = getStartDate + (86400000 * (i + 1))
          term.push(day)
        }
        const allDate = [getStartDate, ...term, getEndDate]
        await ToDoList.create({
          toDo,
          userEmail,
          star,
          startDate,
          endDate,
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
