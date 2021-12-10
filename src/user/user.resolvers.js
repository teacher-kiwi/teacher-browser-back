import Student from "../models/student"
import User from "../models/user"

export default {
  User: {
    studentsNum: async ({ email }) => {
      const teacher = await User.findOne({ email })
      return await (await Student.find({ teacherEmail: teacher.email })).length
    }
  }
}