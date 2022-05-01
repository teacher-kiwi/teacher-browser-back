import FamilyStory from "../../models/familyStory";
import FamilyStoryLike from "../../models/familyStoryLike";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    toggleFamilyStoryLike: protectedMutationResovler(
      async (_, { userEmail, familyStoryId }) => {
        const familyStory = await FamilyStory.findById({
          _id: familyStoryId,
        });
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
            familyStoryCreatedAt: familyStory.createdAt,
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
