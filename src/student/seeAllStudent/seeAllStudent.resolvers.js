import Student from "../../models/student";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeAllStudent: protectedQueryResovler(async (_, __, { loggedInUser }) => {
      return await Student.find({ teacherEmail: loggedInUser.email }).sort({ _id: 1 });
    }),
  },
};
