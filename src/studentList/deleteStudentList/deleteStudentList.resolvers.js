import StudentList from "../../models/studentList";
import Student from "../../models/student";
import { protectedMutationResovler } from "../../user/user.utils";
import mongoose from "mongoose";

export default {
  Mutation: {
    deleteStudentList: protectedMutationResovler(async (_, { teacherEmail, listId }, { loggedInUser }) => {
      await StudentList.deleteOne({ _id: listId });

      const id = mongoose.Types.ObjectId(listId);
      await Student.updateMany({ $pull: { listId: id } });

      return { ok: true };
    }),
  },
};
