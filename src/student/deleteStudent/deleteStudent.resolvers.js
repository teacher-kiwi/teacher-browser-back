import Student from "../../models/student";
import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteStudent: protectedMutationResovler(async (_, { disconnectOnly, teacherEmail, studentId, listId }, { loggedInUser }) => {
      if (disconnectOnly) {
        await Student.updateOne({ _id: studentId }, { $pull: { listId } });
        await StudentList.updateOne({ _id: listId }, { $pull: { studentId } });
      } else {
        await Student.deleteOne({ _id: studentId });
        await StudentList.updateMany({ $pull: { studentId } });
      }
      return { ok: true };
    }),
  },
};
