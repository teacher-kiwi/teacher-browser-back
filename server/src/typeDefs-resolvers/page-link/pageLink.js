const User = require("../../models/User");
const PageLink = require("../../models/PageLink");
const { protectedQuery } = require("../../utils/_utils");

const resolver = {
  Query: {
    seePageLink: async (_, { folder, pageTitle }) => {
      if (pageTitle) return await PageLink.find({ pageTitle });
      if (folder) return await PageLink.find({ folder }).sort({ updateAt: -1 });
      return await PageLink.find().sort({ updateAt: -1 });
    },

    seeMyPageLink: protectedQuery(async (_, { userEmail }) => {
      const user = await User.findOne({ email: userEmail });
      if (!user.link) return [];
      if (user.link.length === 0) return [];

      const myPageLink = [];
      const userLink = user.link;
      for (let i = 0; i < userLink.length; i++) {
        const pageTitle = userLink[i].siteName;
        const pageLink = await PageLink.findOne({ pageTitle });
        myPageLink.push(pageLink);
      }
      return myPageLink;
    }),
  },

  Mutation: {
    createPageLink: async (_, { pageTitle, pageDescription, pageURL, folder, type }) => {
      const pageLink = await PageLink.findOne({ pageTitle });
      if (pageLink) return { ok: false, error: "같은 이름의 추천 페이지 존재" };
      await PageLink.create({
        pageTitle,
        pageDescription,
        pageURL,
        folder,
        type,
        updateAt: new Date(),
      });
      return { ok: true };
    },

    updatePageLink: async (_, { pageTitle, pageDescription, folder }) => {
      await PageLink.updateOne({ pageTitle }, { pageDescription, folder, updateAt: new Date() });
      return { ok: true };
    },

    deletePageLink: async (_, { pageTitle }) => {
      await PageLink.deleteOne({ pageTitle });
      return { ok: true };
    },
  },
};

module.exports = resolver;
