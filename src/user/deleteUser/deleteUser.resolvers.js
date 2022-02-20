import User from "../../models/user";
import Student from "../../models/student";
import StudentList from "../../models/studentList";
import TodoList from "../../models/toDoList";

import { protectedMutationResovler } from "../../user/user.utils";
import Schedule from "../../models/schedule";

export default {
  Mutation: {
    deleteUser: protectedMutationResovler(async (_, { teacherEmail }, { loggedInUser }) => {
      await User.findOneAndDelete({ email: teacherEmail });
      await Student.deleteMany({ teacherEmail });
      await StudentList.deleteMany({ teacherEmail });
      await TodoList.deleteMany({ userEmail: teacherEmail });
      await Schedule.deleteMany({ userEmail: teacherEmail })
      return { ok: true };
    }),
  },
};
