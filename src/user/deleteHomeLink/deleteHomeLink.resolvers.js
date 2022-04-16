import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    deleteHomeLink: protectedMutationResovler(async (_, { userEmail, ID }) => {
      const user = await User.findOne({ email: userEmail });
      const userHomeLinks = user.homeLinks;
      const newHomeLinks = userHomeLinks.filter((item) => item.ID !== ID);
      await User.updateOne({ email: userEmail }, { homeLinks: newHomeLinks });
      return {
        ok: true,
      };
    }),
  },
};
