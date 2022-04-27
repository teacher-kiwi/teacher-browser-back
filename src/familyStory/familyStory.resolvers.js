import FamilyStoryLike from "../models/familyStoryLike";

export default {
  FamilyStory: {
    likeNum: async ({ _id }) => {
      return await FamilyStoryLike.count({ familyStoryId: _id });
    },
    isLiked: async ({ _id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const like = await FamilyStoryLike.findOne({
        familyStoryId: _id,
        userEmail: loggedInUser.email,
      });
      if (like) {
        return true;
      } else {
        return false;
      }
    },
  },
};
