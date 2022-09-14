import PageLink from "../../models/pageLink";
import User from "../../models/user";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeMyPageLink: protectedQueryResovler(async (_, { userEmail }) => {
      const user = await User.findOne({ email: userEmail });
      if (!user.link) {
        return [];
      }
      if (user.link.length === 0) {
        return [];
      }

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
};
