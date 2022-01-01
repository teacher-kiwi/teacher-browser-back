import Student from "../../models/student";
import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteStudent: protectedMutationResovler(async (_, { teacherEmail, studentId }, { loggedInUser }) => {
      await Student.deleteOne({ _id: studentId });
      const id = mongoose.Types.ObjectId(listId);
      await StudentList.updateMany({ $pull: { studentId: id } });

      return { ok: true };
    }),
  },
};
