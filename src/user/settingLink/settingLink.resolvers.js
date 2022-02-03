import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    settingLink: protectedMutationResovler(async (_, { userEmail, link, memo }) => {
      const user = await User.findOne({ email: userEmail })
      if (!user.link || user.link.lenght === 0) {
        await User.updateOne({ email: userEmail }, { link })
        return {
          ok: true
        }
      }
      const userLinkSiteName = user.link.map((item) => item.siteName)
      if (userLinkSiteName.includes(link.siteName)) {
        const newUserLink = user.link.filter((item) => item.siteName !== link.siteName)
        await User.updateOne({ email: userEmail }, { link: newUserLink })
      } else {
        const newUserLink = [...user.link, link]
        await User.updateOne({ email: userEmail }, { link: newUserLink })
      }
      return {
        ok: true
      }
    })
  }
}