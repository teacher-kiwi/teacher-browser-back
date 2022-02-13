import ToDoList from "../../models/toDoList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoListOnlyLength: protectedMutationResovler(async (_, { userEmail, date }) => {
      return await ToDoList.count({ userEmail, allDate: new Date(date).setHours(0, 0, 0, 0) })
    })
  }
}