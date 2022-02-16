import ToDoList from "../../models/toDoList";
import { setKrTime } from "../../shared/dateFn";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoListOnlyLength: protectedMutationResovler(async (_, { userEmail, date }) => {
      return await ToDoList.count({ userEmail, allDate: setKrTime(date) })
    })
  }
}