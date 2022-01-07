import Student from "../models/student";

export default {
  StudentList: {
    students: async ({ listId }) => {
      return await Student.find({ listId: listId.toString() }).sort({ studentNumber: 1 });
    },
  },
};
