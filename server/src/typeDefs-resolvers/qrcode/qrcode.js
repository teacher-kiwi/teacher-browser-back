const Qrcode = require("../../models/Qrcode");
const { protectedMutation } = require("../../utils/_utils");

const resolvers = {
  Query: {
    qrcodes: protectedMutation(async (_, { userEmail }) => await Qrcode.find({ userEmail }).sort({ index: 1 })),
  },
  Mutation: {
    createQrcode: protectedMutation(async (_, { userEmail, title, url }) => {
      try {
        const qrcodes = await Qrcode.find({ userEmail }).sort({ index: -1 });
        if (qrcodes[0]) await Qrcode.create({ userEmail, title, url, index: qrcodes[0].index + 1 });
        else await Qrcode.create({ userEmail, title, url, index: 1 });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    updateQrcode: protectedMutation(async (_, { qrcodeId, title, url }) => {
      const update = {};
      if (title) update.title = title;
      if (url) update.url = url;
      try {
        await Qrcode.updateOne({ _id: qrcodeId }, { $set: update });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    deleteQrcode: protectedMutation(async (_, { qrcodeId }) => {
      try {
        await Qrcode.deleteOne({ _id: qrcodeId });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    changeIndexQrcode: protectedMutation(async (_, { qrcodeId1, qrcodeId2 }) => {
      try {
        const qrcode1 = await Qrcode.findById(qrcodeId1);
        const qrcode2 = await Qrcode.findOneAndUpdate({ _id: qrcodeId2 }, { $set: { index: qrcode1.index } });
        await Qrcode.updateOne({ _id: qrcodeId1 }, { $set: { index: qrcode2.index } });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),
  },
};

module.exports = resolvers;
