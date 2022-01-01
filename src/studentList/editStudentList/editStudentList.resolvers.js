import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudentList: protectedMutationResovler(async (_, { teacherEmail, listId, listName, listOrder, listIcon }, { loggedInUser }) => {
      // listName 값이 있을 경우 이름 수정
      if (listName) {
        //
        // 바꿀 이름이 이미 있는지 검사
        const existStudentList = await StudentList.findOne({ teacherEmail, listName });
        if (existStudentList) return { ok: false, error: "같은 이름의 리스트가 존재합니다." };
        //
        // 바꿀 이름이 없다면 수정
        await StudentList.updateOne({ _id: listId }, { listName });
      }

      // listOrder 값이 있을 경우 순서 수정
      if (listOrder) {
        await StudentList.updateOne({ _id: listId }, { listOrder });
      }

      // listIcon 값이 있을 경우 아이콘 정보 수정
      if (listIcon) {
        await StudentList.updateOne({ _id: listId }, { listIcon });
      }

      return { ok: true };
    }),
  },
};
