import Student from "../../models/student";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudent: protectedMutationResovler(async (_, { teacherEmail, studentId, studentName, studentGender }, { loggedInUser }) => {
      //
      // studentName 값이 있을 경우
      if (studentName) {
        //
        // 바꿀 이름이 이미 있는지 검사
        const existStudent = await Student.findOne({ teacherEmail, studentName });
        if (existStudent) return { ok: false, error: "같은 이름의 학생이 존재합니다." };
        //
        // 바꿀 이름이 없다면 수정
        await Student.updateOne({ _id: studentId }, { studentName });
      }
      //
      // studentGender 값이 있을 경우
      if (studentGender) await Student.updateOne({ _id: studentId }, { studentGender });

      return { ok: true };
    }),
  },
};
