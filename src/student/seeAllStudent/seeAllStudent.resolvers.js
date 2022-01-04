import Student from "../../models/student";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeAllStudent: protectedQueryResovler(async (_, { studentId }, { loggedInUser }) => {
      // studentId 값이 있으면 한 학생 보기
      if (studentId) return await Student.find({ _id: studentId, teacherEmail: loggedInUser.email });
      // studentId 값이 없으면 모든 학생 보기
      else return await Student.find({ teacherEmail: loggedInUser.email }).sort({ _id: 1 });
    }),
  },
};
