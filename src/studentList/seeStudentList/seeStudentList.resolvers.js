import StudentList from "../../models/studentList";
import Student from "../../models/student";
import { protectedResovler } from "../../user/user.utils";

export default {
  Query: {
    seeStudentList: protectedResovler(
      async (_, { listId }, { loggedInUser }) => {
        if (listId) {
          const studentList = await StudentList.findOne({
            teacherEmail: loggedInUser.email,
            _id: listId,
          });

          const modifiedList = {
            listId: listId,
            listOrder: studentList.listOrder,
            listName: studentList.listName,
            students: await Student.find({ listId: listId }).sort({
              studentOrder: 1,
            }),
          };
          return [modifiedList];
        } else {
          const studentList = await StudentList.find({
            teacherEmail: loggedInUser.email,
          }).sort({ listOrder: 1 });
          const modifiedList = studentList.map(async (obj) => {
            console.log(obj);
            return {
              listId: obj._id,
              listOrder: obj.listOrder,
              listName: obj.listName,
              students: await Student.find({ listId: obj._id }).sort({
                studentOrder: 1,
              }),
            };
          });
          return modifiedList;
        }
      }
    ),
  },
};
