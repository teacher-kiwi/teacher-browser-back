import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createToDoList: protectedMutationResovler(async (_, { toDo, userEmail, startDate, endDate }, { loggedInUser }) => {
      await ToDoList.create({
        toDo,
        userEmail,
        startDate: startDate,
        endDate: endDate,
      });
      return { ok: true };
    }),
  },
};
