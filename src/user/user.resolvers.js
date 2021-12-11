import Student from "../models/student"
import User from "../models/user"

export default {
  User: {
    studentNum: async ({ email }) => {
      const teacher = await User.findOne({ email })
      return await Student.count({ teacherEmail: teacher.email })
    }
  }
}