import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    changeStudentListOrder: protectedMutationResovler(async (_, { teacherEmail, preOrder, postOrder }, { loggedInUser }) => {
      const studentList = await StudentList.find({ teacherEmail }).sort({ listOrder: 1 });
      const studentListId = studentList.map((e) => e._id);
      const studentListOrder = studentList.map((e) => e.listOrder);

      if (preOrder !== postOrder) {
        //
        // 순서를 더 뒤로 바꿀 때
        if (preOrder < postOrder) {
          studentListOrder.splice(preOrder - 1, 0, studentListOrder[postOrder - 1]);
          studentListOrder.splice(postOrder, 1);
        }
        //
        // 순서를 더 앞으로 바꿀 때
        else if (preOrder > postOrder) {
          studentListOrder.splice(preOrder, 0, studentListOrder[postOrder - 1]);
          studentListOrder.splice(postOrder - 1, 1);
        }
        //
        // 바꾼 순서대로 DB에 적용
        for (let i = 0; i < studentList.length; i++) {
          await StudentList.updateOne({ _id: studentListId[i] }, { listOrder: studentListOrder[i] });
        }
      }

      return { ok: true };
    }),
  },
};
