import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editJournal: protectedMutationResovler(async (_, { ownerId, index, contents }, { loggedInUser }) => {
      const { contents: journal } = await Journal.findOne({ ownerId });
      if (journal) journal.splice(index, 1, contents);
      await Journal.updateOne({ ownerId }, { contents: journal });
      return { ok: true };
    }),
  },
};
