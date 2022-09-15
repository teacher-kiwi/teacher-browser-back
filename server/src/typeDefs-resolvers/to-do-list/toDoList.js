const ToDoList = require("../../models/ToDoList");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  Query: {
    seeToDoList: protectedQuery(async (_, { isComplete, id, date }, { loggedInUser }) => {
      if (id) return await ToDoList.find({ userEmail: loggedInUser.email, _id: id });
      if (date) return await ToDoList.find({ userEmail: loggedInUser.email, allDate: date }, isComplete);
      return await ToDoList.find({ userEmail: loggedInUser.email, isComplete }).sort({ _id: 1 });
    }),

    seeToDoListOnlyLength: protectedQuery(
      async (_, { userEmail, date }) => await ToDoList.count({ userEmail, allDate: date }),
    ),
  },
  Mutation: {
    createToDoList: protectedMutation(async (_, { toDo, userEmail, startDate, endDate, contents, star }) => {
      if (startDate) {
        let allDate = null;

        if (startDate === endDate) allDate = [startDate];
        else {
          const term = [];
          const termDay = (endDate - startDate) / 1000 / 60 / 60 / 24 - 1;
          for (let i = 0; i < termDay; i++) {
            const day = startDate + 86400000 * (i + 1);
            term.push(day);
          }
          allDate = [startDate, ...term, endDate];
        }
        await ToDoList.create({
          toDo,
          userEmail,
          star,
          startDate,
          endDate,
          allDate,
          ...(contents && { contents }),
        });
        return { ok: true };
      }

      await ToDoList.create({ toDo, userEmail, star, ...(contents && { contents }) });
      return { ok: true };
    }),

    editToDoList: protectedMutation(async (_, { _id, userEmail, toDo, star, startDate, endDate, contents }) => {
      if (startDate) {
        let allDate = null;

        if (startDate === endDate) allDate = [startDate];
        else {
          const term = [];
          const termDay = (endDate - startDate) / 1000 / 60 / 60 / 24 - 1;
          for (let i = 0; i < termDay; i++) {
            const day = startDate + 86400000 * (i + 1);
            term.push(day);
          }
          allDate = [startDate, ...term, endDate];
        }
        await ToDoList.updateOne(
          { _id, userEmail },
          {
            toDo,
            ...(contents ? { contents } : { contents: null }),
            star,
            ...(startDate ? { startDate } : { startDate: null }),
            ...(endDate ? { endDate } : { endDate: null }),
            allDate,
          },
        );
      } else {
        await ToDoList.updateOne(
          { _id, userEmail },
          {
            toDo,
            ...(contents ? { contents } : { contents: null }),
            star,
            startDate: null,
            endDate: null,
            allDate: [],
          },
        );
      }
      return { ok: true };
    }),

    completeToDoList: protectedMutation(async (_, { _id, userEmail }) => {
      const toDoList = await ToDoList.findOne({ _id, userEmail });
      if (toDoList.isComplete) {
        await ToDoList.updateOne({ _id, userEmail }, { isComplete: false });
      } else {
        await ToDoList.updateOne({ _id, userEmail }, { isComplete: true });
      }
      return { ok: true };
    }),

    deleteToDoList: protectedMutation(async (_, { _id, userEmail }) => {
      await ToDoList.deleteOne({ _id, userEmail });
      return { ok: true };
    }),

    deleteAllToDoList: protectedMutation(async (_, { userEmail }) => {
      await ToDoList.deleteMany({ userEmail, isComplete: true });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
