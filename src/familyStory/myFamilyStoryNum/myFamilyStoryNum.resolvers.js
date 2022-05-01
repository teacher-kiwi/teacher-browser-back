import FamilyStory from "../../models/familyStory";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    myFamilyStoryNum: protectedQueryResovler(async (_, { userEmail }) => {
      return await FamilyStory.count({ userEmail });
    }),
  },
};
