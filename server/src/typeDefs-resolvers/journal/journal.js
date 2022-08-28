const Journal = require("../../models/Journal");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  Query: {
    seeJournal: protectedQuery(async (_, { date, studentId, journalId }, { loggedInUser }) => {
      if (date) return await Journal.find({ teacherEmail: loggedInUser.email, date }).sort({ _id: 1 });
      if (journalId) return await Journal.find({ teacherEmail: loggedInUser.email, _id: journalId });
      if (studentId)
        return await Journal.find({ teacherEmail: loggedInUser.email, ownerId: studentId }).sort({ date: 1 });
    }),
  },

  Mutation: {
    writeJournal: protectedMutation(async (_, { userEmail, ownerId, date, text }) => {
      await Journal.create({ teacherEmail: userEmail, ownerId, date, text });
      return { ok: true };
    }),

    editJournal: protectedMutation(async (_, { journalId, date, text }) => {
      await Journal.updateOne({ _id: journalId }, { date, text });
      return { ok: true };
    }),

    deleteJournal: protectedMutation(async (_, { journalId }) => {
      await Journal.deleteOne({ _id: journalId });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
