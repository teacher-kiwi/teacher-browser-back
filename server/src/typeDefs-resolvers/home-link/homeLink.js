const User = require("../../models/User");
const { protectedResolver } = require("../../utils/_utils");

const resolver = {
  Query: {
    validationLinkUrl: async (_, { url }) => {
      let validation;
      await axios(url)
        .then((response) => {
          validation = Boolean(response) ? true : false;
        })
        .catch((err) => {
          if (err) validation = false;
        });
      return validation;
    },
  },

  Mutation: {
    settingLink: protectedResolver(async (_, { userEmail, siteName, memo }) => {
      const user = await User.findOne({ email: userEmail });
      if (!user.link || user.link.lenght === 0) {
        await User.updateOne({ email: userEmail }, { link });
        return { ok: true };
      }

      const userLinkSiteName = user.link.map((item) => item.siteName);
      if (userLinkSiteName.includes(siteName)) {
        const newUserLink = user.link.filter((item) => item.siteName !== siteName);
        await User.updateOne({ email: userEmail }, { link: newUserLink });
      } else {
        const newUserLink = [...user.link, { siteName, memo }];
        await User.updateOne({ email: userEmail }, { link: newUserLink });
      }
      return { ok: true };
    }),

    createHomeLinks: protectedResolver(async (_, { userEmail, title, link, ID }) => {
      const user = await User.findOne({ email: userEmail });
      const userHomeLinks = user.homeLinks;
      const newHomeLinks = [...userHomeLinks, { title, link, ID }];

      await User.updateOne({ email: userEmail }, { homeLinks: newHomeLinks });
      return { ok: true };
    }),

    editHomeLink: protectedResolver(async (_, { userEmail, ID, title, link }) => {
      const user = await User.findOne({ email: userEmail });
      const userHomeLinks = user.homeLinks;
      const targetIndex = userHomeLinks.findIndex((item) => item.ID === ID);
      const newHomeLinks = [
        ...userHomeLinks.slice(0, targetIndex),
        { title, link, ID },
        ...userHomeLinks.slice(targetIndex + 1),
      ];

      await User.updateOne({ email: userEmail }, { homeLinks: newHomeLinks });
      return { ok: true };
    }),

    editPageLinkMemo: protectedResolver(async (_, { userEmail, memo, pageTitle }) => {
      const user = await User.findOne({ email: userEmail });
      const userLink = user.link;
      const newUserLink = userLink.map((item) => {
        if (item.siteName === pageTitle) {
          return { siteName: pageTitle, memo, _id: item._id };
        } else {
          return item;
        }
      });

      await User.updateOne({ email: userEmail }, { link: newUserLink });
      return { ok: true };
    }),

    moveHomeLink: protectedResolver(async (_, { userEmail, sourceIndex, destinationIndex }) => {
      const user = await User.findOne({ email: userEmail });
      const copyLinks = user.homeLinks;
      const moveObj = copyLinks[sourceIndex];
      copyLinks.splice(sourceIndex, 1);
      copyLinks.splice(destinationIndex, 0, moveObj);

      await User.updateOne({ email: userEmail }, { homeLinks: copyLinks });
      return { ok: true };
    }),

    deleteHomeLink: protectedResolver(async (_, { userEmail, ID }) => {
      const user = await User.findOne({ email: userEmail });
      const userHomeLinks = user.homeLinks;
      const newHomeLinks = userHomeLinks.filter((item) => item.ID !== ID);

      await User.updateOne({ email: userEmail }, { homeLinks: newHomeLinks });
      return { ok: true };
    }),

    deleteAllLink: protectedResolver(async (_, { userEmail }) => {
      await User.updateOne({ email: userEmail }, { link: [] });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
