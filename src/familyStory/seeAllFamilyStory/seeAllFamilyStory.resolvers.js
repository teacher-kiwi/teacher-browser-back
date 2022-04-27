import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    seeAllFamilyStory: async () => {
      return await FamilyStory.find().sort({ createdAt: -1 });
    },
  },
};
