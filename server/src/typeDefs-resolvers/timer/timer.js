const TimeRecord = require("../../models/TimeRecord");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  Query: {
    seeTimeRecord: protectedQuery(
      async (_, __, { loggedInUser }) => await TimeRecord.findOne({ userEmail: loggedInUser.email }),
    ),
  },

  Mutation: {
    createTimeRecord: protectedMutation(async (_, { userEmail, timeId, minutes, seconds, milliseconds }) => {
      const isRecord = await TimeRecord.findOne({ userEmail });
      if (isRecord)
        await TimeRecord.updateOne(
          { userEmail },
          { $push: { timeRecord: { timeId, minutes, seconds, milliseconds } } },
        );
      else await TimeRecord.create({ userEmail, timeRecord: [{ timeId, minutes, seconds, milliseconds }] });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
