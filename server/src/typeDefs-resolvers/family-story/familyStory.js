const User = require("../../models/User");
const FamilyStory = require("../../models/FamilyStory");
const FamilyStoryLike = require("../../models/FamilyStoryLike");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  FamilyStory: {
    likeNum: async ({ _id }) => await FamilyStoryLike.count({ familyStoryId: _id }),
    isLiked: async ({ _id }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      const like = await FamilyStoryLike.findOne({ familyStoryId: _id, userEmail: loggedInUser.email });
      return like ? true : false;
    },
  },

  FamilyStoryLike: {
    familyStory: async ({ familyStoryId }) => await FamilyStory.findById({ _id: familyStoryId }),
  },

  Query: {
    seeFamilyStory: async (_, { id }) => await FamilyStory.findOne({ _id: id }),

    seeMyFamilyStory: protectedMutation(
      async (_, { userEmail, page }) =>
        await FamilyStory.find({ userEmail })
          .skip((page - 1) * 12)
          .limit(12)
          .sort({ createdAt: -1 }),
    ),

    seeSearchFamilyStory: async (_, { tag, page }) =>
      await FamilyStory.find({ tag: { $in: tag } })
        .skip((page - 1) * 12)
        .limit(12)
        .sort({ createdAt: -1 }),

    seeRandomFamilyStory: async () => await FamilyStory.aggregate([{ $sample: { size: 1 } }]),

    seeAllFamilyStory: async (_, { page }) =>
      await FamilyStory.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * 12)
        .limit(12),

    seeLikeFamilyStory: protectedMutation(
      async (_, { userEmail, page }) =>
        await FamilyStoryLike.find({ userEmail })
          .skip((page - 1) * 12)
          .limit(12)
          .sort({ familyStoryCreatedAt: -1 }),
    ),

    allFamilyStoryNum: async () => await FamilyStory.count(),

    myFamilyStoryNum: protectedQuery(async (_, { userEmail }) => await FamilyStory.count({ userEmail })),

    searchFamilyStoryNum: async (_, { tag }) => await FamilyStory.count({ tag: { $in: tag } }),

    myFamilyStoryLikeNum: protectedQuery(async (_, { userEmail }) => await FamilyStoryLike.count({ userEmail })),
  },

  Mutation: {
    createFamilyStory: async (
      _,
      { userEmail, url, title, bgColor, videoType, tag, createdAt, contents },
      { loggedInUser },
    ) => {
      const user = await User.findOne({ email: userEmail });
      if (!loggedInUser && user)
        return { ok: false, error: "사용할 수 없는 닉네임입니다. 다른 닉네임을 입력하세요.😂" };

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
      return { ok: true, id: newFamilyStory._id };
    },

    editFamilyStory: protectedMutation(async (_, { url, userEmail, title, bgColor, videoType, tag, contents, id }) => {
      await FamilyStory.updateOne({ _id: id }, { url, title, bgColor, videoType, contents, tag });
      return { ok: true };
    }),

    deleteFamilyStory: protectedMutation(async (_, { userEmail, familyStoryId }, { loggedInUser }) => {
      if (userEmail !== loggedInUser.email) return { ok: false, error: "삭제 권한이 없습니다." };
      await FamilyStory.deleteOne({ userEmail, _id: familyStoryId });
      await FamilyStoryLike.deleteMany({ familyStoryId });
      return { ok: true };
    }),

    deleteFamilyStoryLike: async (_, { _id }) => {
      await FamilyStoryLike.deleteOne({ _id });
      return {
        ok: true,
      };
    },

    deleteAllFamilyStory: protectedMutation(async (_, { userEmail }) => {
      if (userEmail === "nlom0218@naver.com" || "nlom0218@gmail.com") {
        await FamilyStory.deleteMany();
        return { ok: true };
      } else return { ok: false };
    }),

    deleteAllFamilyStoryLike: protectedMutation(async (_, { userEmail }) => {
      if (userEmail === "nlom0218@naver.com" || "nlom0218@gmail.com") {
        await FamilyStoryLike.deleteMany();
        return { ok: true };
      } else return { ok: false };
    }),

    deleteNotUserFamilyStory: protectedMutation(async (_, { userEmail, _id }) => {
      if (userEmail === "nlom0218@naver.com" || "nlom0218@gmail.com") {
        await FamilyStory.deleteOne({ _id });
        return { ok: true };
      } else return { ok: false };
    }),

    toggleFamilyStoryLike: protectedMutation(async (_, { userEmail, familyStoryId }) => {
      const like = await FamilyStoryLike.findOne({ userEmail, familyStoryId });
      if (like) {
        await FamilyStoryLike.deleteOne({ userEmail, familyStoryId });
        return { ok: true, message: "delete" };
      } else {
        const familyStory = await FamilyStory.findById({ _id: familyStoryId });
        await FamilyStoryLike.create({ userEmail, familyStoryId, familyStoryCreatedAt: familyStory.createdAt });
        return { ok: true, message: "create" };
      }
    }),
  },
};

module.exports = resolver;
