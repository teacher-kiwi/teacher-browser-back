import FamilyStory from "../../models/familyStory";

export default {
  Query: {
    seeFamilyStory: async (_, { id }) => {
      return await FamilyStory.findOne({ _id: id });
    },
  },
};
