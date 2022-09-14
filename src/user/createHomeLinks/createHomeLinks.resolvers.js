import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    createHomeLinks: protectedMutationResovler(async (_, { userEmail, title, link, ID }) => {
      const user = await User.findOne({ email: userEmail });
      const userHomeLinks = user.homeLinks;
      const newHomeLinks = [...userHomeLinks, { title, link, ID }];

      await User.updateOne({ email: userEmail }, { homeLinks: newHomeLinks });
      return {
        ok: true,
      };
    }),
  },
};
