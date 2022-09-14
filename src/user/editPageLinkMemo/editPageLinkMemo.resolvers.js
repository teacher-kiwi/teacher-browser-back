import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    editPageLinkMemo: protectedMutationResovler(async (_, { userEmail, memo, pageTitle }) => {
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
      return {
        ok: true,
      };
    }),
  },
};
