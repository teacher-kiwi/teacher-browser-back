import StudentList from "../../models/studentList";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudentList: protectedResovler(
      async (_, { teacherEmail, listId, listName }, { loggedInUser }) => {
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
            error: "삭제 권한이 없습니다.",
          };
        }
        if (listName) {
          //
          // 바꿀 이름이 이미 있는지 검사
          const existStudentList = await StudentList.findOne({
            teacherEmail,
            listName,
          });
          if (existStudentList) {
            return {
              ok: false,
              error: "같은 이름의 리스트가 존재합니다.",
            };
          }
          //
          // 바꿀 이름이 없다면 수정
          await StudentList.updateOne({ _id: listId }, { listName });
        }

        return {
          ok: true,
        };
      }
    ),
  },
};
