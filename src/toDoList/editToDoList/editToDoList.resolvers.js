import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editToDoList: protectedMutationResovler(
      async (_, { _id, userEmail, toDo, star, startDate, endDate, contents }, { loggedInUser }) => {
        if (startDate) {
          let allDate = null;

          if (startDate === endDate) {
            allDate = [startDate];
          } else {
            const term = [];
            const termDay = (endDate - startDate) / 1000 / 60 / 60 / 24 - 1;
            for (let i = 0; i < termDay; i++) {
              const day = startDate + 86400000 * (i + 1);
              term.push(day);
            }
            allDate = [startDate, ...term, endDate];
          }
          await ToDoList.updateOne(
            { _id, userEmail },
            {
              toDo,
              ...(contents ? { contents } : { contents: null }),
              star,
              ...(startDate ? { startDate } : { startDate: null }),
              ...(endDate ? { endDate } : { endDate: null }),
              allDate,
            },
          );
        } else {
          await ToDoList.updateOne(
            { _id, userEmail },
            {
              toDo,
              ...(contents ? { contents } : { contents: null }),
              star,
              startDate: null,
              endDate: null,
              allDate: [],
            },
          );
        }

        return { ok: true };
      },
    ),
  },
};
