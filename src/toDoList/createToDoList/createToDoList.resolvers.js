import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createToDoList: protectedMutationResovler(
      async (_, { toDo, userEmail, startDate, endDate, contents, star }, { loggedInUser }) => {
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
          await ToDoList.create({
            toDo,
            userEmail,
            star,
            startDate,
            endDate,
            allDate,
            ...(contents && { contents }),
          });
          return {
            ok: true,
          };
        }

        await ToDoList.create({
          toDo,
          userEmail,
          star,
          ...(contents && { contents }),
        });
        return { ok: true };
      },
    ),
  },
};
