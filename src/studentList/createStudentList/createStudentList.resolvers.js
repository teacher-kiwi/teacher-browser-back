import StudentList from "../../models/studentList";
import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudentList: protectedResovler(
      async (
        _,
        { teacherEmail, listName, listOrder, students },
        { loggedInUser }
      ) => {
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
        await StudentList.create({
          teacherEmail,
          listName,
          listOrder,
        });
        const listId = await StudentList.findOne({
          teacherEmail,
          listName,
          listOrder,
        });
        students.forEach(async (element) => {
          await Student.create({
            teacherEmail,
            studentName: element.studentName,
            studentOrder: element.studentOrder,
            listId: listId._id,
          });
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
