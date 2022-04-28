import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    allFamilyStoryNum: async () => {
      return FamilyStory.count();
    },
  },
};
