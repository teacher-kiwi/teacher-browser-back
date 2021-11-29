import User from "../../models/user";
import { protectedResovler } from "../user.utils";

export default {
  Query: {
    me: protectedResovler(async (_, __, { loggedInUser }) => {
      return await User.findOne({ email: loggedInUser.email })
    })
  }
}