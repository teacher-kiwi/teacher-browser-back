import FamilyStory from "../../models/familyStory";
import User from "../../models/user";

export default {
  Mutation: {
    createFamilyStory: async (
      _,
      { userEmail, url, title, bgColor, videoType, tag, createdAt, contents },
      { loggedInUser },
    ) => {
      const user = await User.findOne({ email: userEmail });
      if (!loggedInUser && user) {
        return {
          ok: false,
          error: "사용할 수 없는 닉네임입니다. 다른 닉네임을 입력하세요.😂",
        };
      }
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
