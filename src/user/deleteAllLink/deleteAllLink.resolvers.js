import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    deleteAllLink: protectedMutationResovler(async (_, { userEmail }) => {
      await User.updateOne({ email: userEmail }, { link: [] })
      return {
        ok: true
      }
    })
  }
}