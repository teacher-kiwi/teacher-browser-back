import Student from "../../models/student";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudent: protectedMutationResovler(async (_, { teacherEmail, studentString }, { loggedInUser }) => {
      const studentArr = JSON.parse(studentString);
      const existStudent = [];

      for (let i = 0; i < studentArr.length; i++) {
        const student = await Student.findOne({ teacherEmail, studentName: studentArr[i].name });
        if (!student) await Student.create({ teacherEmail, studentName: studentArr[i].name, studentGender: studentArr[i].gender });
        else existStudent.push(student.studentName);
      }

      return {
        ok: true,
        ...(existStudent.length !== 0 && { error: `${existStudent.join(", ")}의 이름은 이미 존재합니다.` }),
      };
    }),
  },
};
