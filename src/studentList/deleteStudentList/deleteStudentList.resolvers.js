import StudentList from "../../models/studentList";
import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";
import mongoose from "mongoose";

export default {
  Mutation: {
    deleteStudentList: protectedResovler(
      async (_, { teacherEmail, listId }, { loggedInUser }) => {
        const user = await User.findOne({ email: teacherEmail });
        if (!user) {
          return {
            ok: false,
            error: "사용자를 찾을 수 없습니다.",
          };
        }
        if (user.email !== loggedInUser.email) {
          return {
            ok: false,
            error: "등록 권한이 없습니다.",
          };
        }
        await StudentList.deleteOne({ _id: listId });
        const id = mongoose.Types.ObjectId(listId);
        await Student.updateMany({ $pull: { listId: id } });

        return {
          ok: true,
        };
      }
    ),
  },
};
