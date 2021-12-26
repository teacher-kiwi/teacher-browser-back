import StudentList from "../../models/studentList";
import Student from "../../models/student";
import User from "../../models/user";
import { protectedResovler } from "../../user/user.utils";

export default {
  Mutation: {
    createStudentList: protectedResovler(
      async (
        _,
        { teacherEmail, listName, listOrder, students },
        { loggedInUser }
      ) => {
        const user = await User.findOne({ email: teacherEmail });
        if (!user) {
          return {
            ok: false,
            error: "사용자를 찾을 수 없습니다.",
          };
        }
        if (user.email !== loggedInUser.email) {
          return {
            ok: false,
            error: "등록 권한이 없습니다.",
          };
        }
        //studentList 생성
        await StudentList.create({
          teacherEmail,
          listName,
          listOrder,
        });

        //studentId 값이 요청값에 있을 경우
        if (students[0]?.studentId) {
          const studentIdList = students.map((obj) => obj.studentId);
          await StudentList.updateOne(
            { _id: createdList._id },
            { studentId: studentIdList }
          );
        }

        //studentId 값이 요청값에 없을 경우
        else if (students[0]?.studentName) {
          //listId 불러오기
          const createdList = await StudentList.findOne({
            teacherEmail,
            listName,
            listOrder,
          });
          //입력된 student 생성하기
          for (let element of students) {
            await Student.create({
              teacherEmail,
              studentName: element.studentName,
              studentOrder: element.studentOrder,
              listId: createdList._id,
            });
          }

          //studentId를 studentList에 저장
          const createdStudent = await Student.find({
            listId: [createdList._id],
          });
          const studentIdList = createdStudent.map((obj) => obj._id);
          await StudentList.updateOne(
            { _id: createdList._id },
            { studentId: studentIdList }
          );
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
