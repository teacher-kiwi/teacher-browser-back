const User = require("../../models/User");
const Student = require("../../models/Student");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

resolver = {
  Query: {
    seeAllTag: protectedQuery(async (_, __, { loggedInUser }) => {
      const allStudents = await Student.find({ teacherEmail: loggedInUser.email });
      const tags = [];
      allStudents.forEach((e) => tags.push.apply(tags, e.tag));
      const uniqueTags = [...new Set(tags)];
      uniqueTags.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

      return uniqueTags;
    }),
  },
  Mutation: {
    createTag: protectedMutation(async (_, { userEmail, tag }) => {
      await User.updateOne({ email: userEmail }, { $addToSet: { tag } });
      return { ok: true };
    }),

    deleteTag: protectedMutation(async (_, { userEmail, tag }) => {
      await User.updateOne({ email: userEmail }, { $pull: { tag } });
      await Student.updateMany({ teacherEmail: userEmail }, { $pull: { tag } });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
