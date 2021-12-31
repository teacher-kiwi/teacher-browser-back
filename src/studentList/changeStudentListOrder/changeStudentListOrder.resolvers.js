import StudentList from "../../models/studentList";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    changeStudentListOrder: protectedResovler(
      async (_, { teacherEmail, preOrder, postOrder }, { loggedInUser }) => {
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

        const studentList = await StudentList.find({
          teacherEmail,
        }).sort({ listOrder: 1 });
        const studentListId = studentList.map((e) => e._id);
        const studentListOrder = studentList.map((e) => e.listOrder);

        if (preOrder !== postOrder) {
          //
          // 순서를 더 뒤로 바꿀 때
          if (preOrder < postOrder) {
            studentListOrder.splice(
              preOrder - 1,
              0,
              studentListOrder[postOrder - 1]
            );
            studentListOrder.splice(postOrder, 1);
          }
          //
          // 순서를 더 앞으로 바꿀 때
          else if (preOrder > postOrder) {
            studentListOrder.splice(
              preOrder,
              0,
              studentListOrder[postOrder - 1]
            );
            studentListOrder.splice(postOrder - 1, 1);
          }
          //
          // 바꾼 순서대로 DB에 적용
          for (let i = 0; i < studentList.length; i++) {
            await StudentList.updateOne(
              { _id: studentListId[i] },
              { listOrder: studentListOrder[i] }
            );
          }
        }

        return {
          ok: true,
        };
      }
    ),
  },
};
