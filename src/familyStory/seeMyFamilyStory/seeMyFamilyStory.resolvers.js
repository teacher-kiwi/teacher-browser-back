import FamilyStory from "../../models/familyStory";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Query: {
    seeMyFamilyStory: protectedMutationResovler(async (_, { userEmail }) => {
      return await FamilyStory.find({ userEmail }).sort({ createdAt: -1 });
    }),
  },
};
