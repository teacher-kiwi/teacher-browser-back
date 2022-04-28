import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    seeAllFamilyStory: async (_, { page }) => {
      return await FamilyStory.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * 12)
        .limit(12);
    },
  },
};
