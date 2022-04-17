import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    editHomeLink: protectedMutationResovler(
      async (_, { userEmail, ID, title, link }) => {
        const user = await User.findOne({ email: userEmail });
        const userHomeLinks = user.homeLinks;
        const targetIndex = userHomeLinks.findIndex((item) => item.ID === ID);
        const newHomeLinks = [
          ...userHomeLinks.slice(0, targetIndex),
          { title, link, ID },
          ...userHomeLinks.slice(targetIndex + 1),
        ];
        await User.updateOne({ email: userEmail }, { homeLinks: newHomeLinks });
        return {
          ok: true,
        };
      }
    ),
  },
};
