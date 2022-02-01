import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editJournal: protectedMutationResovler(async (_, { ownerId, journalId, contents }, { loggedInUser }) => {
      const { contents: journal } = await Journal.findOne({ ownerId });

      if (journal) {
        const newJournal = journal.map((item) => {
          if (item._id.toString() === journalId) return { id: item._id, date: contents.date, text: contents.text };
          else return item;
        });
        await Journal.updateOne({ ownerId }, { contents: newJournal });
        return { ok: true };
      }
    }),
  },
};
