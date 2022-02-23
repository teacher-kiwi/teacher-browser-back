import Attendance from "../../models/attendance";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createAttendance: protectedMutationResovler(async (_, { userEmail, studentId, type, date, contents, month }) => {
      await Attendance.create({
        userEmail,
        studentId,
        type,
        date,
        month,
        ...(contents && { contents })
      })
      return {
        ok: true
      }
    })
  }
}