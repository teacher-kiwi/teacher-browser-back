import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    searchFamilyStoryNum: async (_, { tag }) => {
      return await FamilyStory.count({ tag: { $in: tag } });
    },
  },
};
