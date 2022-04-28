import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    seeSearchFamilyStory: async (_, { tag }) => {
      return await FamilyStory.find({
        tag: { $in: tag },
      }).sort({ createdAt: -1 });
    },
  },
};
