import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteJournal: protectedMutationResovler(async (_, { ownerId, index }, { loggedInUser }) => {
      const { contents: journal } = await Journal.findOne({ ownerId });
      if (journal) journal.splice(index, 1);
      await Journal.updateOne({ ownerId }, { contents: journal });
      return { ok: true };
    }),
  },
};
