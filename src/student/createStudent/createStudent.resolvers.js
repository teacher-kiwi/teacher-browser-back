import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudent: protectedResovler(async (_, { teacherEmail, studentString }, { loggedInUser }) => {
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
      const studentArr = studentString.split(",")
      for (let i = 0; i < studentArr.length; i++) {
        await Student.create({
          teacherEmail,
          name: studentArr[i],
          order: i + 1
        })
      }
      return {
        ok: true
      }
    })
  }
}