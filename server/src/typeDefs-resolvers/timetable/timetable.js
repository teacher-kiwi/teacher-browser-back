const TimetableData = require("../../models/TimetableData");
const TimetableTime = require("../../models/TimetableTime");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  Query: {
    getTimetableData: protectedQuery(async (_, { day, index }, { loggedInUser }) => {
      if (day) {
        const timetableData = await TimetableData.find({ teacherEmail: loggedInUser.email, day }).sort({ index: 1 });
        if (timetableData.length !== 0) return timetableData;
        else {
          for (let i = 0; i < 30; i++) {
            await TimetableData.create({ teacherEmail: loggedInUser.email, index: i, day: i % 5 });
          }
          const newTimetableData = await TimetableData.find({ teacherEmail: loggedInUser.email, day }).sort({
            index: 1,
          });
          return newTimetableData;
        }
      }
      if (index) return await TimetableData.find({ teacherEmail: loggedInUser.email, index });

      const timetableData = await TimetableData.find({ teacherEmail: loggedInUser.email }).sort({ index: 1 });
      if (timetableData.length !== 0) return timetableData;
      else {
        for (let i = 0; i < 30; i++) {
          await TimetableData.create({ teacherEmail: loggedInUser.email, index: i, day: i % 5 });
        }
        const newTimetableData = await TimetableData.find({ teacherEmail: loggedInUser.email }).sort({ index: 1 });
        return newTimetableData;
      }
    }),

    getTimetableTime: protectedQuery(async (_, __, { loggedInUser }) => {
      const time = await TimetableTime.findOne({ teacherEmail: loggedInUser.email });
      if (time) return time;
      else return { _id: null, teacherEmail: loggedInUser.email };
    }),
  },

  Mutation: {
    setTimetableData: protectedMutation(async (_, { teacherEmail, index, subName, color, memo }) => {
      const existedTimetableData = await TimetableData.findOne({ teacherEmail });
      if (!existedTimetableData) {
        for (let i = 0; i < 30; i++) {
          await TimetableData.create({ teacherEmail, index: i, day: i % 5 });
        }
      }
      for (let i = 0; i < index.length; i++) {
        await TimetableData.updateOne(
          { teacherEmail, index: index[i] },
          {
            teacherEmail,
            day: index[i] % 5,
            subName,
            ...(color ? { color } : { color: null }),
            ...(memo ? { memo } : { memo: null }),
          },
        );
      }
      return { ok: true };
    }),

    setTimetableTime: protectedMutation(
      async (
        _,
        { teacherEmail, start1, end1, start2, end2, start3, end3, start4, end4, start5, end5, start6, end6 },
      ) => {
        const time = await TimetableTime.findOne({ teacherEmail });
        if (time) {
          await TimetableTime.updateOne(
            { teacherEmail },
            { start1, end1, start2, end2, start3, end3, start4, end4, start5, end5, start6, end6 },
          );
          return { ok: true };
        } else {
          await TimetableTime.create({
            teacherEmail,
            start1,
            end1,
            start2,
            end2,
            start3,
            end3,
            start4,
            end4,
            start5,
            end5,
            start6,
            end6,
          });
          return { ok: true };
        }
      },
    ),

    resetTimetableData: protectedMutation(async (_, { teacherEmail, resetIndex }) => {
      await TimetableData.updateOne({ teacherEmail, index: resetIndex }, { subName: null, color: null, memo: null });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
