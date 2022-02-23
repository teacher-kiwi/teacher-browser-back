import Attendance from "../../models/attendance";
import Journal from "../../models/journal";
import Schedule from "../../models/schedule";
import Student from "../../models/student";
import StudentList from "../../models/studentList";
import TimeRecord from "../../models/timeRecord";
import TimetableData from "../../models/timetableData";
import TimetableTime from "../../models/timetableTime";
import TodoList from "../../models/toDoList";
import User from "../../models/user";

import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteUser: protectedMutationResovler(async (_, { teacherEmail }, { loggedInUser }) => {
      await Attendance.deleteMany({ userEmail: teacherEmail });
      await Journal.deleteMany({ teacherEmail });
      await Schedule.deleteMany({ userEmail: teacherEmail });
      await Student.deleteMany({ teacherEmail });
      await StudentList.deleteMany({ teacherEmail });
      await TimeRecord.deleteMany({ userEmail: teacherEmail });
      await TimetableData.deleteMany({ teacherEmail });
      await TimetableTime.deleteMany({ teacherEmail });
      await TodoList.deleteMany({ userEmail: teacherEmail });
      await Schedule.deleteMany({ userEmail: teacherEmail });
      await User.findOneAndDelete({ email: teacherEmail });
      return { ok: true };
    }),
  },
};
