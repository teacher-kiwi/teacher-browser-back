import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    seeSearchFamilyStory: async (_, { tag, page }) => {
      return await FamilyStory.find({
        tag: { $in: tag },
      })
        .skip((page - 1) * 12)
        .limit(12)
        .sort({ createdAt: -1 });
    },
  },
};
