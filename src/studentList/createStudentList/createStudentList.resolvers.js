import StudentList from "../../models/studentList";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudentList: protectedResovler(
      async (_, { teacherEmail, listName }, { loggedInUser }) => {
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

        const existStudentList = await StudentList.findOne({
          email: teacherEmail,
          listName,
        });
        if (existStudentList)
          return { ok: false, error: "리스트 이름이 존재합니다." };

        const studentListNum = await StudentList.count({ teacherEmail });

        await StudentList.create({
          teacherEmail,
          listName,
          listOrder: studentListNum + 1,
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
