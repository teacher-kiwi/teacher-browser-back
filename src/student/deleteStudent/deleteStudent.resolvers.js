import Student from "../../models/student";
import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteStudent: protectedMutationResovler(async (_, { teacherEmail, studentId }, { loggedInUser }) => {
      await Student.deleteOne({ _id: studentId });
      await StudentList.updateMany({ $pull: { studentId } });

      return { ok: true };
    }),
  },
};
