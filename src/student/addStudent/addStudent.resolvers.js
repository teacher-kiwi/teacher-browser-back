import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    addStudent: protectedResovler(async (_, { teacherEmail, name }, { loggedInUser }) => {
      const user = await User.findOne({ email: teacherEmail })
      if (!user) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다."
        }
      }
      if (user.email !== loggedInUser.email) {
        return {
          ok: false,
          error: "등록 권한이 없습니다."
        }
      }
      const student = await Student.find({ teacherEmail }).sort({ "order": 1 })
      const lastStudent = student[student.length - 1]
      await Student.create({
        teacherEmail,
        name,
        order: lastStudent.order + 1
      })
      return {
        ok: true
      }
    })
  }
}