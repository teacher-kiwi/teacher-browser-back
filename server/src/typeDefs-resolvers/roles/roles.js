const Roles = require("../../models/Roles");
const Role = require("../../models/Role");
const Student = require("../../models/Student");
const { protectedMutation } = require("../../utils/_utils");

const resolvers = {
  Roles: {
    roles: async ({ _id }) => await Role.find({ roles: _id.toString() }),
  },

  Role: {
    students: async ({ students: studentList }) =>
      studentList.map(async ({ order, students }) => ({
        order,
        students: await Student.find({ _id: { $in: students } }),
      })),
  },

  Query: {
    roles: protectedMutation(async (_, { userEmail, _id }) => {
      const query = { userEmail };
      if (_id) query._id = _id;
      // if (typeof date === "number") {
      //   query.startDate = { $lte: date };
      //   query.endDate = { $gt: date };
      // }
      return await Roles.findOne(query);
    }),
  },

  Mutation: {
    createRoles: protectedMutation(async (_, { userEmail, startDate, endDate, data }) => {
      try {
        if (await Roles.findOne({ userEmail })) {
          throw new Error("이미 1인1역이 존재합니다.");
        } else {
          const roles = await Roles.create({ userEmail, dates: [{ order: 1, startDate, endDate }] });
          const convertedData = data.map(({ title, detail, students }) => ({
            title,
            detail,
            roles: roles._id,
            students: { order: 1, students },
          }));
          await Role.insertMany(convertedData);
          return roles;
        }
      } catch (err) {
        throw err.message;
      }
    }),

    deleteRoles: protectedMutation(async (_, { _id }) => {
      try {
        const roles = await Roles.findOneAndDelete({ _id });
        await Role.deleteMany({ roles: roles._id.toString() });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    addNewDateRoles: protectedMutation(async (_, { userEmail, startDate, endDate, data }) => {
      try {
        const roles = await Roles.findOne({ userEmail });
        const newOrder = roles.dates[roles.dates.length - 1].order + 1;
        if (roles) {
          data.forEach(async ({ id, students }) => {
            await Role.updateOne({ _id: id }, { $push: { students: { order: newOrder, students } } });
          });

          await Roles.findOneAndUpdate(
            { userEmail },
            {
              $push: {
                dates: {
                  order: newOrder,
                  startDate,
                  endDate,
                },
              },
            },
            { new: true },
          );
          return { ok: true };
        } else {
          throw new Error("1인1역이 존재하지 않습니다.");
        }
      } catch (err) {
        throw err.message;
      }
    }),

    updateRoles: protectedMutation(async (_, { userEmail, order, startDate, endDate, data }) => {
      try {
        await Roles.findOneAndUpdate(
          { userEmail, "dates.order": order },
          { $set: { "dates.$.startDate": startDate, "dates.$.endDate": endDate } },
          { new: true },
        );
        // 역할(학생 명단) 수정 추가
        return { ok: true };
      } catch (err) {
        throw err.message;
      }
    }),

    // addRole: protectedMutation(async (_, { data }) => {
    //   try {
    //     return await Role.create(data);
    //   } catch (err) {
    //     throw err.message;
    //   }
    // }),

    // updateRole: protectedMutation(async (_, { _id, title, detail }) => {
    //   try {
    //     return await Role.findOneAndUpdate({ _id }, { title, detail });
    //   } catch (err) {
    //     throw err.message;
    //   }
    // }),

    // addStudentRole: protectedMutation(async (_, { roleId, students }) => {
    //   try {
    //     await Role.updateOne({ _id: roleId }, { students });
    //     return { ok: true };
    //   } catch (err) {
    //     return { ok: false, error: err.message };
    //   }
    // }),

    // deleteStudentRole: protectedMutation(async (_, { roleId, students }) => {
    //   try {
    //     await Role.updateOne({ _id: roleId }, { $pull: { students: { $in: students } } });
    //     return { ok: true };
    //   } catch (err) {
    //     return { ok: false, error: err.message };
    //   }
    // }),
  },
};

module.exports = resolvers;
