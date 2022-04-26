import FamilyStory from "../../models/familyStory";

export default {
  Mutation: {
    createFamilyStory: async (
      _,
      { userEmail, url, title, bgColor, videoType, tag, createdAt, contents }
    ) => {
      const newFamilyStory = await FamilyStory.create({
        userEmail,
        url,
        title,
        bgColor,
        videoType,
        tag,
        createdAt,
        contents,
      });
      return {
        ok: true,
        id: newFamilyStory._id,
      };
    },
  },
};
