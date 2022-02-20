import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudentList: protectedMutationResovler(async (_, { teacherEmail, listName }, { loggedInUser }) => {
      const existStudentList = await StudentList.findOne({ teacherEmail, listName: listName.trim() });
      if (existStudentList) return { ok: false, error: "리스트 이름이 존재합니다. 😅" };
      if (listName.trim() === "") return { ok: false, error: "리스트 이름이 공백입니다. 😅" };
      //
      //리스트 순서를 정하는 코드(가장 빠른 빈 자리 혹은 맨 뒤 자리)
      const studentList = await StudentList.find({ teacherEmail }).sort({ listOrder: 1 });
      const studentOrderList = studentList.map((e) => e.listOrder);
      let studentListNum = studentOrderList.length + 1;
      for (let i = 0; i < studentOrderList.length; i++) {
        if (studentOrderList[i] !== i + 1) {
          studentListNum = i + 1;
          break;
        }
      }
      await StudentList.create({ teacherEmail, listName, listOrder: studentListNum });

      return { ok: true };
    }),
  },
};
