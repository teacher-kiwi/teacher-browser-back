import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    moveHomeLink: protectedMutationResovler(async (_, { userEmail, sourceIndex, destinationIndex }) => {
      const user = await User.findOne({ email: userEmail });
      const copyLinks = user.homeLinks;
      const moveObj = copyLinks[sourceIndex];
      copyLinks.splice(sourceIndex, 1);
      copyLinks.splice(destinationIndex, 0, moveObj);
      await User.updateOne({ email: userEmail }, { homeLinks: copyLinks });
      return {
        ok: true,
      };
    }),
  },
};
