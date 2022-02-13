import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editJournal: protectedMutationResovler(async (_, { journalId, date, text }, { loggedInUser }) => {
      await Journal.updateOne({ _id: journalId }, { date, text });
      return { ok: true };
    }),
  },
};
