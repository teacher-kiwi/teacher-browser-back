import StudentList from "../../models/studentList";
import Student from "../../models/student";
import { protectedResovler } from "../../user/user.utils";

export default {
  Query: {
    seeStudentList: protectedResovler(
      async (_, { listId }, { loggedInUser }) => {
        //listId를 입력한 경우,
        if (listId) {
          //특정 studentList를 검색
          const studentList = await StudentList.findOne({
            teacherEmail: loggedInUser.email,
            _id: listId,
          });

          const modifiedList = {
            listId: listId,
            listOrder: studentList.listOrder,
            listName: studentList.listName,
            studentId: studentList.studentId,
            students: await Student.find({ listId: listId }).sort({
              studentOrder: 1,
            }),
          };
          return [modifiedList];
        } else {
          //해당 유저의 모든 studentList를 검색
          const studentList = await StudentList.find({
            teacherEmail: loggedInUser.email,
          }).sort({ listOrder: 1 });

          const modifiedList = studentList.map(async (obj) => {
            return {
              listId: obj._id,
              listOrder: obj.listOrder,
              listName: obj.listName,
              studentId: obj.studentId,
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
