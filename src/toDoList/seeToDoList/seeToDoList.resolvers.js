import ToDoList from "../../models/toDoList";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoList: protectedQueryResovler(async (_, { isComplete, id, date }, { loggedInUser }) => {
      if (id) {
        return await ToDoList.find({ userEmail: loggedInUser.email, _id: id });
      }
      if (date) {
        return await ToDoList.find({ userEmail: loggedInUser.email, allDate: date }, isComplete);
      }
      return await ToDoList.find({ userEmail: loggedInUser.email, isComplete }).sort({ _id: 1 });
    }),
  },
};
