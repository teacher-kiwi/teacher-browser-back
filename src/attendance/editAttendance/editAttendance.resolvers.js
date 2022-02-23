import Attendance from "../../models/attendance";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editAttendance: protectedMutationResovler(async (_, { attendId, type, date, contents, month }, { loggedInUser }) => {

      if (contents) {
        await Attendance.updateOne(
          {
            userEmail: loggedInUser.email,
            _id: attendId
          },
          {
            type,
            date,
            contents,
            month
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
            date,
            month,
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