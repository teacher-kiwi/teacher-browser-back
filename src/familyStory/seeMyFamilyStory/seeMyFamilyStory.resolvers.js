import FamilyStory from "../../models/familyStory";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Query: {
    seeMyFamilyStory: protectedMutationResovler(
      async (_, { userEmail, page }) => {
        return await FamilyStory.find({ userEmail })
          .skip((page - 1) * 12)
          .limit(12)
          .sort({ createdAt: -1 });
      }
    ),
  },
};
