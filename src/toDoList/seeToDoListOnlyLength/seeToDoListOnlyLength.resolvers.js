import ToDoList from "../../models/toDoList";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoListOnlyLength: protectedQueryResovler(async (_, { userEmail, date }) => {
      return await ToDoList.count({ userEmail, allDate: date });
    }),
  },
};
