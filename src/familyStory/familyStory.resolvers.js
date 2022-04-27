import FamilyStoryLike from "../models/familyStoryLike";

export default {
  FamilyStory: {
    likeNum: async ({ _id }) => {
      return FamilyStoryLike.count({ familyStoryId: _id });
    },
  },
};
