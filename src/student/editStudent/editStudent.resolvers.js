import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudent: protectedResovler(
      async (
        _,
        { teacherEmail, studentId, studentName, studentGender },
        { loggedInUser }
      ) => {
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
        //
        // studentName 값이 있을 경우
        if (studentName) {
          console.log(studentName);

          //
          // 바꿀 이름이 이미 있는지 검사
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
          //
          // 바꿀 이름이 없다면 수정
          await Student.updateOne({ _id: studentId }, { studentName });
        }

        //
        // studentGender 값이 있을 경우
        if (studentGender) {
          console.log(studentGender);
          await Student.updateOne({ _id: studentId }, { studentGender });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};
