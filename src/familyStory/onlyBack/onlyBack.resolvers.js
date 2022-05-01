import FamilyStoryLike from "../../models/familyStoryLike";

export default {
  Mutation: {
    deleteFamilyStoryLike: async (_, { _id }) => {
      await FamilyStoryLike.deleteOne({ _id });
      return {
        ok: true,
      };
    },
  },
};
