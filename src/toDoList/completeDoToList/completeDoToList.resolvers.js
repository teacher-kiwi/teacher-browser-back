import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    completeToDoList: protectedMutationResovler(async (_, { _id, userEmail }, { loggedInUser }) => {
      const toDoList = await ToDoList.findOne({ _id, userEmail });
      if (toDoList.isComplete) {
        await ToDoList.updateOne({ _id, userEmail }, { isComplete: false });
      } else {
        await ToDoList.updateOne({ _id, userEmail }, { isComplete: true });
      }
      return { ok: true };
    }),
  },
};
