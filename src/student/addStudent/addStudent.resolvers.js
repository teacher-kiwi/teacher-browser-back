import Student from "../../models/student";
import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    addStudent: protectedMutationResovler(async (_, { teacherEmail, studentId, listId }, { loggedInUser }) => {
      // 학생이 중복되는지 검사
      const studentList = await StudentList.findOne({ _id: listId, studentId });
      if (studentList) return { ok: false, error: "리스트에 해당 학생이 존재합니다." };

      // 리스트에 학생id 추가
      await StudentList.updateOne({ _id: listId }, { $addToSet: { studentId } });

      // 학생에 리스트id 추가
      await Student.updateOne({ _id: studentId }, { $addToSet: { listId } });

      return { ok: true };
    }),
  },
};
