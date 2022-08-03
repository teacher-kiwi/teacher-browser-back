import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    setFavoriteNews: protectedMutationResovler(async (_, { news, userEmail }, { loggedInUser }) => {
      const user = await User.findOne({ email: userEmail });
      const existNews = user.favoriteNews.includes(news);
      if (existNews) {
        await User.updateOne({ email: userEmail }, { $pull: { favoriteNews: news } });
      } else {
        await User.updateOne({ email: userEmail }, { $addToSet: { favoriteNews: news } });
      }
      return {
        ok: true,
      };
    }),
  },
};
