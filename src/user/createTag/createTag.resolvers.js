import User from "../../models/user";
import { protectedMutationResovler } from "../user.utils";

export default {
  Mutation: {
    createTag: protectedMutationResovler(async (_, { userEmail, tag }) => {
      await User.updateOne({ email: userEmail }, { $addToSet: { tag } })
      return {
        ok: true
      }
    })
  }
}