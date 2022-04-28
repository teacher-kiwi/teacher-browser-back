import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    allFamilyStoryNum: async () => {
      return await FamilyStory.count();
    },
  },
};
