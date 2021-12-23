import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudent: protectedResovler(
      async (_, { teacherEmail, studentName, id }, { loggedInUser }) => {
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
            error: "삭제 권한이 없습니다.",
          };
        }
        const existStudent = await Student.findOne({
          teacherEmail,
          studentName,
        });
        if (existStudent) {
          return {
            ok: false,
            error: "같은 이름의 학생이 존재합니다.",
          };
        }
        await Student.updateOne({ _id: id }, { studentName });
        return {
          ok: true,
        };
      }
    ),
  },
};
