import FamilyStoryLike from "../../models/familyStoryLike";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Query: {
    seeLikeFamilyStory: protectedMutationResovler(
      async (_, { userEmail, page }) => {
        return await FamilyStoryLike.find({ userEmail })
          .skip((page - 1) * 12)
          .limit(12)
          .sort({
            familyStoryCreatedAt: -1,
          });
      }
    ),
  },
};
