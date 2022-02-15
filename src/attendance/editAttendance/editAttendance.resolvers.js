import Attendance from "../../models/attendance";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editAttendance: protectedMutationResovler(async (_, { attendId, type, date, contents }, { loggedInUser }) => {
      const attendDate = new Date(date).setHours(0, 0, 0, 0)
      if (contents) {
        await Attendance.updateOne(
          {
            userEmail: loggedInUser.email,
            _id: attendId
          },
          {
            type,
            date: attendDate,
            contents
          }
        )
      } else {
        await Attendance.updateOne(
          {
            userEmail: loggedInUser.email,
            _id: attendId
          },
          {
            type,
            date: attendDate,
            contents: null
          }
        )
      }
      return {
        ok: true
      }
    })
  }
}