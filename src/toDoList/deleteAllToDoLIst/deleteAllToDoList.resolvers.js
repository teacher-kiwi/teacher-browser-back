import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteAllToDoList: protectedMutationResovler(async (_, { userEmail }) => {
      await ToDoList.deleteMany({ userEmail, isComplete: true })
      return {
        ok: true
      }
    })
  }
}