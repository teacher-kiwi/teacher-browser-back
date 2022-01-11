import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudentList: protectedMutationResovler(async (_, { teacherEmail, listId, listName, listOrder, listIcon }, { loggedInUser }) => {
      //
      // 바꿀 이름이 이미 있는지 검사
      if (listName) {
        const existStudentList = await StudentList.findOne({ teacherEmail, listName: listName.trim() });
        if (existStudentList) return { ok: false, error: "같은 이름의 리스트가 존재합니다." };
      }
      //
      // 바꿀 이름이 없다면 수정
      await StudentList.updateOne({ _id: listId }, { listName, listOrder, listIcon });
      //
      // listIcon 값이 delete이면 null로 저장
      if (listIcon === "delete") await StudentList.updateOne({ _id: listId }, { listIcon: null });

      return { ok: true };
    }),
  },
};
