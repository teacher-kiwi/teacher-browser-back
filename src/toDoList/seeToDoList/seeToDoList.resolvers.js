import ToDoList from "../../models/toDoList";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoList: protectedQueryResovler(async (_, __, { loggedInUser }) => {
      return await ToDoList.find({ userEmail: loggedInUser.email });
    }),
  },
};
