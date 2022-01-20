import TimeRecord from "../../models/timeRecord";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createTimeRecord: protectedMutationResovler(async (_, { userEmail, timeId, minutes, seconds, milliseconds }, { loggedInUser }) => {
      const isRecord = await TimeRecord.findOne({ userEmail });
      if (isRecord) await TimeRecord.updateOne({ userEmail }, { $push: { timeRecord: { timeId, minutes, seconds, milliseconds } } });
      else await TimeRecord.create({ userEmail, timeRecord: [{ timeId, minutes, seconds, milliseconds }] });
      return { ok: true };
    }),
  },
};
