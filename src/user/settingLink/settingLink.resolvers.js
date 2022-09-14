import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    settingLink: protectedMutationResovler(async (_, { userEmail, siteName, memo }) => {
      const user = await User.findOne({ email: userEmail });
      if (!user.link || user.link.lenght === 0) {
        await User.updateOne({ email: userEmail }, { link });
        return {
          ok: true,
        };
      }
      const userLinkSiteName = user.link.map((item) => item.siteName);
      if (userLinkSiteName.includes(siteName)) {
        const newUserLink = user.link.filter((item) => item.siteName !== siteName);
        await User.updateOne({ email: userEmail }, { link: newUserLink });
      } else {
        const newUserLink = [...user.link, { siteName, memo }];
        await User.updateOne({ email: userEmail }, { link: newUserLink });
      }
      return {
        ok: true,
      };
    }),
  },
};
