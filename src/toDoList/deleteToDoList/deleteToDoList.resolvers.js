import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteToDoList: protectedMutationResovler(async (_, { _id, userEmail }, { loggedInUser }) => {
      await ToDoList.deleteOne({ _id, userEmail });
      return { ok: true };
    }),
  },
};
