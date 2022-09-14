import FamilyStory from "../../models/familyStory";
import FamilyStoryLike from "../../models/familyStoryLike";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteFamilyStory: protectedMutationResovler(async (_, { userEmail, familyStoryId }, { loggedInUser }) => {
      if (userEmail !== loggedInUser.email) {
        return {
          ok: false,
          error: "삭제 권한이 없습니다.",
        };
      }
      await FamilyStory.deleteOne({ userEmail, _id: familyStoryId });
      await FamilyStoryLike.deleteMany({ familyStoryId });
      return {
        ok: true,
      };
    }),
  },
};
