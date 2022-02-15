import Attendance from "../../models/attendance";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createAttendance: protectedMutationResovler(async (_, { userEmail, studentId, type, date, contents }) => {
      const attendDate = new Date(date).setHours(0, 0, 0, 0)
      await Attendance.create({
        userEmail,
        studentId,
        type,
        date: attendDate,
        ...(contents && { contents })
      })
      return {
        ok: true
      }
    })
  }
}