import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudentList: protectedMutationResovler(async (_, { teacherEmail, listName }, { loggedInUser }) => {
      const existStudentList = await StudentList.findOne({ email: teacherEmail, listName });
      if (existStudentList) return { ok: false, error: "리스트 이름이 존재합니다." };

      const studentListNum = await StudentList.count({ teacherEmail });
      await StudentList.create({ teacherEmail, listName, listOrder: studentListNum + 1 });

      return { ok: true };
    }),
  },
};
