import FamilyStoryLike from "../../models/familyStoryLike";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    myFamilyStoryLikeNum: protectedQueryResovler(async (_, { userEmail }) => {
      return await FamilyStoryLike.count({ userEmail });
    }),
  },
};
