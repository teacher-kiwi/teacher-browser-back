import ToDoList from "../../models/toDoList";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoList: protectedQueryResovler(async (_, { isComplete, id }, { loggedInUser }) => {
      if (id) {
        return await ToDoList.find({ userEmail: loggedInUser.email, isComplete, _id: id })
      }
      return await ToDoList.find({ userEmail: loggedInUser.email, isComplete }).sort({ _id: 1 });
    }),
  },
};
