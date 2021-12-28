import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudent: protectedResovler(
      async (_, { teacherEmail, studentString }, { loggedInUser }) => {
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
        //const studentArr = studentString.split(",");
        const studentArr = JSON.parse(studentString);

        const existStudent = [];
        for (let i = 0; i < studentArr.length; i++) {
          const student = await Student.findOne({
            teacherEmail,
            studentName: studentArr[i].name,
          });
          if (!student) {
            await Student.create({
              teacherEmail,
              studentName: studentArr[i].name,
              studentGender: studentArr[i].gender,
            });
          } else {
            existStudent.push(student.studentName);
          }
        }
        return {
          ok: true,
          ...(existStudent.length !== 0 && {
            error: `${existStudent.join(", ")}의 이름은 이미 존재합니다.`,
          }),
        };
      }
    ),
  },
};
