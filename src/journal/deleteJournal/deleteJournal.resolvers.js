import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteJournal: protectedMutationResovler(async (_, { journalId }, { loggedInUser }) => {
      await Journal.deleteOne({ _id: journalId });

      return { ok: true };
    }),
  },
};
