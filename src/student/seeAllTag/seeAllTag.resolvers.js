import Student from "../../models/student";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeAllTag: protectedQueryResovler(async (_, __, { loggedInUser }) => {
      const allStudents = await Student.find({ teacherEmail: loggedInUser.email });
      const tags = [];
      allStudents.forEach((e) => tags.push.apply(tags, e.tag));
      const uniqueTags = [...new Set(tags)];
      uniqueTags.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

      return uniqueTags;
    }),
  },
};
