import Student from "../models/student"
import User from "../models/user"

export default {
  Attendance: {
    studentName: async ({ studentId }) => {
      const student = await Student.findOne({ _id: studentId })
      return student.studentName
    }
  }
}