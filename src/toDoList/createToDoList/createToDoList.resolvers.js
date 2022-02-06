import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createToDoList: protectedMutationResovler(async (_, { toDo, userEmail, startDate, endDate, contents, star }, { loggedInUser }) => {
      await ToDoList.create({
        toDo,
        userEmail,
        star,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(contents && { contents })
      });
      return { ok: true };
    }),
  },
};
