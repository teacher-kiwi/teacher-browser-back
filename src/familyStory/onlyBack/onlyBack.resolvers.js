import FamilyStory from "../../models/familyStory";
import FamilyStoryLike from "../../models/familyStoryLike";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    deleteFamilyStoryLike: async (_, { _id }) => {
      await FamilyStoryLike.deleteOne({ _id });
      return {
        ok: true,
      };
    },
    deleteAllFamilyStory: protectedMutationResovler(
      async (_, { userEmail }) => {
        if (userEmail === "nlom0218@naver.com" || "nlom0218@gmail.com") {
          await FamilyStory.deleteMany();
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
          };
        }
      }
    ),
    deleteAllFamilyStoryLike: protectedMutationResovler(
      async (_, { userEmail }) => {
        if (userEmail === "nlom0218@naver.com" || "nlom0218@gmail.com") {
          await FamilyStoryLike.deleteMany();
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
          };
        }
      }
    ),
    deleteNotUserFamilyStory: protectedMutationResovler(
      async (_, { userEmail, _id }) => {
        if (userEmail === "nlom0218@naver.com" || "nlom0218@gmail.com") {
          await FamilyStory.deleteOne({ _id });
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
          };
        }
      }
    ),
  },
};
