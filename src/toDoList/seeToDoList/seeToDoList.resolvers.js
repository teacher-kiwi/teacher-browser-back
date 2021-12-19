import ToDoList from "../../models/toDoList";
import { protectedResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoList: protectedResovler(async (_, __, { loggedInUser }) => {
      return await ToDoList.find({ userEmail: loggedInUser.email });
    }),
  },
};
