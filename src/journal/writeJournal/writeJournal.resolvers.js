import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    writeJournal: protectedMutationResovler(async (_, { userEmail, ownerId, date, text }, { loggedInUser }) => {
      await Journal.create({ teacherEmail: userEmail, ownerId, date, text });

      return { ok: true };
    }),
  },
};
