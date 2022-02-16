import Attendance from "../../models/attendance";
import Journal from "../../models/journal";
import Student from "../../models/student";
import StudentList from "../../models/studentList";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteAllStudent: protectedMutationResovler(async (_, { teacherEmail }, { loggedInUser }) => {
      //
      // 휴지통에 있는 학생을 찾아서 id 값만 배열로 만들기
      const students = await Student.find({ teacherEmail, trash: true });
      const ids = students.map((x) => x._id);
      //
      // 학생 리스트 전체를 뒤져서 휴지통에 있는 학생 id를 삭제하기
      await StudentList.updateMany({ teacherEmail }, { $pull: { studentId: { $in: ids } } });
      //
      // 마지막으로 휴지통에 있는 학생 다 지우기
      for (let i = 0; i < ids.length; i++) {
        await Attendance.deleteMany({ studentId: ids[i] });
        await Journal.deleteMany({ ownerId: ids[i] });
      }
      await Student.deleteMany({ teacherEmail, trash: true });
      return { ok: true };
    }),
  },
};
