import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteJournal: protectedMutationResovler(async (_, { ownerId, journalId }, { loggedInUser }) => {
      const { contents: journal } = await Journal.findOne({ ownerId });

      if (journal) {
        const newJournal = journal.filter((item) => item._id.toString() !== journalId);
        await Journal.updateOne({ ownerId }, { contents: newJournal });
        return { ok: true };
      }
    }),
  },
};
