import StudentList from "../../models/studentList";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeStudentList: protectedQueryResovler(async (_, { listId }, { loggedInUser }) => {
      //listId를 입력한 경우,
      if (listId) {
        //특정 studentList를 검색
        const studentList = await StudentList.findOne({ teacherEmail: loggedInUser.email, _id: listId });
        return [
          {
            listId: listId,
            teacherEmail: studentList.teacherEmail,
            listOrder: studentList.listOrder,
            listName: studentList.listName,
            listIcon: studentList.listIcon,
            studentId: studentList.studentId,
          },
        ];
        //listId가 null인 경우,
      } else {
        //해당 유저의 모든 studentList를 검색
        const studentList = await StudentList.find({ teacherEmail: loggedInUser.email }).sort({ listOrder: 1 });
        const modifiedList = studentList.map(async (obj) => {
          return {
            //_id로 리턴되는 key를 listId로 수정하기 위해서 map 메서드로 처리
            listId: obj._id,
            teacherEmail: obj.teacherEmail,
            listOrder: obj.listOrder,
            listName: obj.listName,
            listIcon: obj.listIcon,
            studentId: obj.studentId,
          };
        });
        return modifiedList;
      }
    }),
  },
};
