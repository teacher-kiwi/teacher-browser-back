const User = require("../../models/User");
const { protectedMutation } = require("../../utils/_utils");

const resolver = {
  Mutation: {
    createDDay: protectedMutation(async (_, { userEmail, title, date, ID }) => {
      const user = await User.findOne({ email: userEmail });
      const userDDay = user.dDay;
      const newDDay = [...userDDay, { title, date, ID }];

      await User.updateOne({ email: userEmail }, { dDay: newDDay });
      return { ok: true };
    }),

    editDDay: protectedMutation(async (_, { userEmail, ID, title, date }) => {
      const user = await User.findOne({ email: userEmail });
      const userDDay = user.dDay;
      const targetIndex = userDDay.findIndex((item) => item.ID === ID);
      const newDDay = [...userDDay.slice(0, targetIndex), { title, date, ID }, ...userDDay.slice(targetIndex + 1)];

      await User.updateOne({ email: userEmail }, { dDay: newDDay });
      return { ok: true };
    }),

    deleteDDay: protectedMutation(async (_, { userEmail, ID }) => {
      const user = await User.findOne({ email: userEmail });
      const userDDay = user.dDay;
      const newUserDDay = userDDay.filter((item) => item.ID !== ID);

      await User.updateOne({ email: userEmail }, { dDay: newUserDDay });
      return { ok: true };
    }),

    deleteAllDDay: protectedMutation(async (_, { userEmail }) => {
      await User.updateOne({ email: userEmail }, { dDay: [] });
      return { ok: true };
    }),

    toggleIsMoveDDay: protectedMutation(async (_, { userEmail, type }) => {
      if (type === "stop") {
        await User.updateOne({ email: userEmail }, { isMoveDDay: false });
      } else {
        await User.updateOne({ email: userEmail }, { isMoveDDay: true });
      }
      return { ok: true };
    }),
  },
};

module.exports = resolver;
