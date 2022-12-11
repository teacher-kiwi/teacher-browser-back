const XmasMsg = require("../../models/XmasMsg");
const { protectedMutation } = require("../../utils/_utils");

const resolvers = {
  Query: {
    xmasMsg: async (_, { userEmail, pageNumber }) => {
      return {
        msg: await XmasMsg.find(userEmail ? { userEmail } : null)
          .sort({ _id: -1 })
          .skip(pageNumber >= 1 ? (pageNumber - 1) * 6 : null)
          .limit(pageNumber >= 1 ? 6 : null),
        count: await XmasMsg.find(userEmail ? { userEmail } : null).count(),
      };
    },
  },
  Mutation: {
    createXmasMsg: protectedMutation(async (_, { userEmail, author, text, bg }) => {
      try {
        await XmasMsg.create({ userEmail, author, text, bg });

        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    updateXmasMsg: protectedMutation(async (_, { xmasMsgId, author, text, bg }) => {
      const update = {};
      if (author) update.author = author;
      if (text) update.text = text;
      if (bg) update.bg = bg;
      try {
        await XmasMsg.updateOne({ _id: xmasMsgId }, { $set: update });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    deleteXmasMsg: protectedMutation(async (_, { xmasMsgId }) => {
      try {
        await XmasMsg.deleteOne({ _id: xmasMsgId });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),
  },
};

module.exports = resolvers;
