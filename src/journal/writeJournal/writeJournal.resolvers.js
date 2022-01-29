import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    writeJournal: protectedMutationResovler(async (_, { ownerId, contents }, { loggedInUser }) => {
      const savedJournal = await Journal.findOne({ ownerId });
      if (savedJournal) await Journal.updateOne({ ownerId }, { $push: { contents } });
      else await Journal.create({ ownerId, contents });
      return { ok: true };
    }),
  },
};
