import Student from "../../models/student";
import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteAllStudent: protectedMutationResovler(async (_, { teacherEmail }, { loggedInUser }) => {
      await Student.deleteMany({ teacherEmail });
      await StudentList.updateMany({ teacherEmail }, { studentId: [] });
      return { ok: true };
    }),
  },
};
