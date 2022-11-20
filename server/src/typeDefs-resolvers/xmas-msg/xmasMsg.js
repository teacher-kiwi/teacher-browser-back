const XmasMsg = require("../../models/XmasMsg");
const { protectedMutation } = require("../../utils/_utils");

const resolvers = {
  Query: {
    xmasMsg: async (_, { userEmail }) => (userEmail ? await XmasMsg.find({ userEmail }) : await XmasMsg.find()),
  },
  Mutation: {
    createXmasMsg: protectedMutation(async (_, { userEmail, author, text }) => {
      try {
        await XmasMsg.create({ userEmail, author, text });

        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    updateXmasMsg: protectedMutation(async (_, { xmasMsgId, author, text }) => {
      const update = {};
      if (author) update.author = author;
      if (text) update.text = text;
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

    //   changeIndexQrcode: protectedMutation(async (_, { qrcodeId1, qrcodeId2 }) => {
    //     try {
    //       const qrcode1 = await Qrcode.findById(qrcodeId1);
    //       const qrcode2 = await Qrcode.findOneAndUpdate({ _id: qrcodeId2 }, { $set: { index: qrcode1.index } });
    //       await Qrcode.updateOne({ _id: qrcodeId1 }, { $set: { index: qrcode2.index } });
    //       return { ok: true };
    //     } catch (err) {
    //       return { ok: false, error: err.message };
    //     }
    //   }),
  },
};

module.exports = resolvers;
