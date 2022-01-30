import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editToDoList: protectedMutationResovler(async (_, { _id, userEmail, toDo, isComplete, startDate, endDate, contents }, { loggedInUser }) => {
      await ToDoList.updateOne({ _id, userEmail }, { $set: { toDo, isComplete, startDate, endDate, contents } });
      return { ok: true };
    }),
  },
};
