const Roles = require("../../models/Roles");
const Role = require("../../models/Role");
const Student = require("../../models/Student");
const { protectedMutation } = require("../../utils/_utils");

const resolvers = {
  Roles: {
    roles: async ({ _id }) => await Role.find({ roles: _id.toString() }),
  },

  Role: {
    students: async ({ students: studentList }) => await Student.find({ _id: { $in: studentList } }),
  },

  Query: {
    roles: protectedMutation(async (_, { userEmail }) => await Roles.find({ userEmail })),
  },

  Mutation: {
    createRoles: protectedMutation(async (_, { userEmail, startDate, endDate }) => {
      try {
        return await Roles.create({ userEmail, startDate, endDate });
      } catch (err) {
        throw err.message;
      }
    }),

    updateRoles: protectedMutation(async (_, { _id, startDate, endDate }) => {
      try {
        return await Roles.findOneAndUpdate({ _id }, { startDate, endDate });
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

    addRole: protectedMutation(async (_, { data }) => {
      try {
        return await Role.create(data);
      } catch (err) {
        throw err.message;
      }
    }),

    updateRole: protectedMutation(async (_, { _id, title, detail }) => {
      try {
        return await Role.findOneAndUpdate({ _id }, { title, detail });
      } catch (err) {
        throw err.message;
      }
    }),

    addStudentRole: protectedMutation(async (_, { roleId, students }) => {
      try {
        await Role.updateOne({ _id: roleId }, { students });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),

    deleteStudentRole: protectedMutation(async (_, { roleId, students }) => {
      try {
        await Role.updateOne({ _id: roleId }, { $pull: { students: { $in: students } } });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    }),
  },
};

module.exports = resolvers;
