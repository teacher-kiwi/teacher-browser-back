import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    addStudent: protectedResovler(async (_, { teacherEmail, name, order }, { loggedInUser }) => {
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
      const existStudent = await Student.findOne({ teacherEmail, name })
      if (existStudent) {
        return {
          ok: false,
          error: "같은 이름의 학생이 존재합니다."
        }
      }

      const existStudent2 = await Student.findOne({ teacherEmail, order })
      if (existStudent2) {
        return {
          ok: false,
          error: "같은 번호의 학생이 존재합니다."
        }
      }

      await Student.create({
        teacherEmail,
        name,
        order
      })
      return {
        ok: true
      }
    })
  }
}