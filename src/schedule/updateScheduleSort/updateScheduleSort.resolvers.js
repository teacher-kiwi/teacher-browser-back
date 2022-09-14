import Schedule from "../../models/schedule";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    updateScheduleSort: protectedMutationResovler(async (_, { userEmail, scheduleId, sort }) => {
      await Schedule.updateOne(
        {
          userEmail,
          _id: scheduleId,
        },
        {
          sort,
        },
      );
      return {
        ok: true,
      };
    }),
  },
};
