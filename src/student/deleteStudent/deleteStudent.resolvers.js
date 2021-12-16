import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteStudent: protectedResovler(async (_, { teacherEmail, name }, { loggedInUser }) => {
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
          error: "삭제 권한이 없습니다."
        }
      }
      await Student.deleteOne({ teacherEmail, name })
      return {
        ok: true
      }
    })
  }
}