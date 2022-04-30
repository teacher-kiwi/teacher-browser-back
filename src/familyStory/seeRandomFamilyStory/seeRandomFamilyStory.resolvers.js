import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    seeRandomFamilyStory: async () => {
      return await FamilyStory.aggregate([{ $sample: { size: 1 } }]);
    },
  },
};
