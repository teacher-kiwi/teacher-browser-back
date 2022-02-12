import ToDoList from "../../models/toDoList";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeToDoList: protectedQueryResovler(async (_, { isComplete, id, date }, { loggedInUser }) => {
      if (id) {
        return await ToDoList.find({ userEmail: loggedInUser.email, isComplete, _id: id })
      }
      if (date) {
        return await ToDoList.find({ userEmail: loggedInUser.email, allDate: new Date(date).setHours(0, 0, 0, 0) })
      }
      return await ToDoList.find({ userEmail: loggedInUser.email, isComplete }).sort({ _id: 1 });
    }),
  },
};
