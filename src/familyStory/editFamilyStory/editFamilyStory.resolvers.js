import FamilyStory from "../../models/familyStory";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editFamilyStory: protectedMutationResovler(
      async (
        _,
        { url, userEmail, title, bgColor, videoType, tag, contents, id }
      ) => {
        await FamilyStory.updateOne(
          { _id: id },
          { url, title, bgColor, videoType, contents, tag }
        );
        return {
          ok: true,
        };
      }
    ),
  },
};
