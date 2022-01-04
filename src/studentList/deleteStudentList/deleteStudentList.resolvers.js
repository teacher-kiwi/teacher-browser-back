import StudentList from "../../models/studentList";
import Student from "../../models/student";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteStudentList: protectedMutationResovler(async (_, { teacherEmail, listId }, { loggedInUser }) => {
      await StudentList.deleteOne({ _id: listId });

      await Student.updateMany({ $pull: { listId } });

      return { ok: true };
    }),
  },
};
