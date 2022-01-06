import Student from "../../models/student";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeAllStudent: protectedQueryResovler(async (_, { studentId, allergy }, { loggedInUser }) => {
      // allergy 값이 있으면 allergy 모든 학생 보기
      if (allergy) return await Student.find({ teacherEmail: loggedInUser.email, allergy }).sort({ studentNumber: 1 });
      // studentId 값만 있으면 한 학생 보기
      if (studentId) return await Student.findOne({ _id: studentId, teacherEmail: loggedInUser.email });
      // 아무 값도 없으면 모든 학생 보기
      else return await Student.find({ teacherEmail: loggedInUser.email }).sort({ _id: 1 });
    }),
  },
};
