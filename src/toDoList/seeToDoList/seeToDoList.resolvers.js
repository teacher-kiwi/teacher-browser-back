import ToDoList from "../../models/toDoList";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoList: protectedQueryResovler(async (_, { isComplete }, { loggedInUser }) => {
      return await ToDoList.find({ userEmail: loggedInUser.email, isComplete });
    }),
  },
};
