const User = require("../../models/User");
const Student = require("../../models/Student");
const Attendance = require("../../models/Attendance");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  Attendance: {
    studentName: async ({ studentId }) => {
      const student = await Student.findOne({ _id: studentId });
      return student.studentName;
    },
  },

  Query: {
    seeAttendance: protectedQuery(async (_, { date, studentId, attendId, month }, { loggedInUser }) => {
      if (month) return await Attendance.find({ userEmail: loggedInUser.email, month });
      if (date) return await Attendance.find({ userEmail: loggedInUser.email, date });
      if (attendId) return await Attendance.find({ userEmail: loggedInUser.email, _id: attendId });
      return { ok: true };
    }),
  },

  Mutation: {
    createAttendance: protectedMutation(async (_, { userEmail, studentId, type, contents, dateMonthArr }) => {
      try {
        for (const studentIndex in studentId) {
          console.log(studentId[studentIndex]);
          for (const dateIndex in dateMonthArr) {
            console.log(dateMonthArr[dateIndex]);
            await Attendance.create({
              userEmail,
              studentId: studentId[studentIndex],
              type,
              ...(contents && { contents }),
              date: dateMonthArr[dateIndex].date,
              month: dateMonthArr[dateIndex].month,
            });
          }
        }
      } catch (err) {
        throw err.massage;
      }

      return { ok: true };
    }),

    // createAttendance: protectedMutation(async (_, { userEmail, studentId, type, date, contents, month }) => {
    //   await Attendance.create({
    //     userEmail,
    //     studentId,
    //     type,
    //     date,
    //     month,
    //     ...(contents && { contents }),
    //   });
    //   return { ok: true };
    // }),

    createManyAttendance: protectedMutation(async (_, { userEmail, studentId, type, contents, dateMonthArr }) => {
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
      return { ok: true };
    }),

    editAttendance: protectedMutation(async (_, { attendId, type, date, contents, month }, { loggedInUser }) => {
      if (contents)
        await Attendance.updateOne({ userEmail: loggedInUser.email, _id: attendId }, { type, date, contents, month });
      else
        await Attendance.updateOne(
          { userEmail: loggedInUser.email, _id: attendId },
          { type, date, month, contents: null },
        );
      return { ok: true };
    }),

    deleteAttendance: protectedMutation(async (_, { userEmail, attendId }) => {
      await Attendance.deleteOne({ userEmail, _id: attendId });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
