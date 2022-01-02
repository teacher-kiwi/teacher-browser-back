import Student from "../../models/student";
import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    addStudent: protectedMutationResovler(async (_, { teacherEmail, studentId, listId }, { loggedInUser }) => {
      // studentId 는 Array 타입
      let checkExist;

      for (const id of studentId) {
        // 학생이 중복되는지 검사
        const studentList = await StudentList.findOne({ _id: listId, studentId: id });
        if (studentList) {
          checkExist = true;
          continue;
        }

        // 리스트에 학생id 추가
        await StudentList.updateOne({ _id: listId }, { $addToSet: { studentId: id } });

        // 학생에 리스트id 추가
        await Student.updateOne({ _id: id }, { $addToSet: { listId } });
      }

      if (checkExist) return { ok: true, error: "일부 학생이 이미 리스트에 존재합니다." };
      else return { ok: true };
    }),
  },
};
