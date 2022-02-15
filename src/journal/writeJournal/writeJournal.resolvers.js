import Journal from "../../models/journal";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    writeJournal: protectedMutationResovler(async (_, { userEmail, ownerId, date, text }, { loggedInUser }) => {
      await Journal.create({ teacherEmail: userEmail, ownerId, date: new Date(date).setHours(0, 0, 0, 0), text });

      return { ok: true };
    }),
  },
};
