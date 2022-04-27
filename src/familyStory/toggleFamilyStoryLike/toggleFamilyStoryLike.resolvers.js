import FamilyStoryLike from "../../models/familyStoryLike";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    toggleFamilyStoryLike: protectedMutationResovler(
      async (_, { userEmail, familyStoryId }) => {
        const like = await FamilyStoryLike.findOne({
          userEmail,
          familyStoryId,
        });
        if (like) {
          await FamilyStoryLike.deleteOne({
            userEmail,
            familyStoryId,
          });
          return {
            ok: true,
            message: "delete",
          };
        } else {
          await FamilyStoryLike.create({
            userEmail,
            familyStoryId,
          });
          return {
            ok: true,
            message: "create",
          };
        }
      }
    ),
  },
};
