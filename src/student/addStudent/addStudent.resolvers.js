import Student from "../../models/student";
import StudentList from "../../models/studentList";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    addStudent: protectedResovler(
      async (_, { teacherEmail, studentId, listId }, { loggedInUser }) => {
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

        const studentList = await StudentList.findOne({
          _id: listId,
          studentId,
        });
        if (studentList)
          return { ok: false, error: "리스트에 해당 학생이 존재합니다." };
        //update 리스트에 학생 추가
        await StudentList.updateOne(
          { _id: listId },
          { $addToSet: { studentId } }
        );
        //update 학생에 리스트 추가
        await Student.updateOne({ _id: studentId }, { $addToSet: { listId } });

        return {
          ok: true,
        };
      }
    ),
  },
};
