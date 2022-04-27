import FamilyStoryLike from "../../models/familyStoryLike";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Query: {
    seeLikeFamilyStory: protectedMutationResovler(async (_, { userEmail }) => {
      return await FamilyStoryLike.find({ userEmail }).sort({
        familyStoryCreatedAt: -1,
      });
    }),
  },
};
