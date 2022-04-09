import Attendance from "../../models/attendance";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createManyAttendance: protectedMutationResovler(
      async (_, { userEmail, studentId, type, contents, dateMonthArr }) => {
        for (let i = 0; i < dateMonthArr.length; i++) {
          await Attendance.create({
            userEmail,
            studentId,
            type,
            ...(contents && { contents }),
            date: dateMonthArr[i].date,
            month: dateMonthArr[i].month,
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
