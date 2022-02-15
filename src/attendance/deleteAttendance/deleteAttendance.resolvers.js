import Attendance from "../../models/attendance";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteAttendance: protectedMutationResovler(async (_, { userEmail, attendId }) => {
      await Attendance.deleteOne({ userEmail, _id: attendId })
      return {
        ok: true
      }
    })
  }
}