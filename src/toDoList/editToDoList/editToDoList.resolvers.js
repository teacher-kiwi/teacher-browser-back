import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editToDoList: protectedMutationResovler(async (_, { _id, userEmail, toDo, star, startDate, endDate, contents }, { loggedInUser }) => {
      if (!startDate) {
        await ToDoList.updateOne({
          _id, userEmail
        },
          {
            startDate: null,
            endDate: null
          });
      }
      await ToDoList.updateOne({ _id, userEmail }, { toDo, contents, star, startDate, endDate });
      return { ok: true };
    }),
  },
};
