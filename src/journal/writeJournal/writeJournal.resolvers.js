import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    writeJournal: protectedMutationResovler(async (_, { ownerId, date, text }, { loggedInUser }) => {
      await Journal.create({ ownerId, date, text });

      return { ok: true };
    }),
  },
};
