import User from "../../models/user";
import { protectedQueryResovler } from "../user.utils";

export default {
  Query: {
    me: protectedQueryResovler(async (_, __, { loggedInUser }) => {
      return await User.findOne({ email: loggedInUser.email });
    }),
  },
};
