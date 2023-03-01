const Student = require("../../models/Student");
const StudentList = require("../../models/StudentList");
const User = require("../../models/User");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  StudentList: {
    students: async ({ listId }, { sort }) => {
      let sortValue;
      sort === "name" // sort 값이 "name"일 경우 studentName으로 정렬
        ? (sortValue = { studentName: 1 })
        : sort === "num" // sort 값이 "num"일 경우 studentNumber로 정렬
        ? (sortValue = { studentNumber: 1 })
        : // sort 값이 없거나 "name" 이나 "num" 값이 아닐 경우 id(생성일)순으로 보기
          (sortValue = { _id: 1 });

      return await Student.find({ listId: listId.toString() })
        .sort(sortValue)
        .collation({ locale: "ko", numericOrdering: true });
    },
  },

  Query: {
    seeStudentList: protectedQuery(async (_, { listId }, { loggedInUser }) => {
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

  Mutation: {
    createStudentList: protectedMutation(async (_, { teacherEmail, listName, isDefault }) => {
      const existStudentList = await StudentList.findOne({ teacherEmail, listName: listName.trim() });
      if (existStudentList) return { ok: false, error: "리스트 이름이 존재합니다. 😅" };
      if (listName.trim() === "") return { ok: false, error: "리스트 이름이 공백입니다. 😅" };
      //리스트 순서를 정하는 코드(가장 빠른 빈 자리 혹은 맨 뒤 자리)
      const studentList = await StudentList.find({ teacherEmail }).sort({ listOrder: 1 });
      const studentOrderList = studentList.map((e) => e.listOrder);
      let studentListNum = studentOrderList.length + 1;
      for (let i = 0; i < studentOrderList.length; i++) {
        if (studentOrderList[i] !== i + 1) {
          studentListNum = i + 1;
          break;
        }
      }
      const { _id: listId } = await StudentList.create({ teacherEmail, listName, listOrder: studentListNum });

      if (isDefault) {
        await User.updateOne({ email: teacherEmail }, { $set: { defaultStudentListId: listId } });
      }

      return { ok: true };
    }),

    editStudentList: protectedMutation(
      async (_, { teacherEmail, listId, listName, listOrder, listIcon }, { loggedInUser }) => {
        // 바꿀 이름이 이미 있는지 검사
        if (listName) {
          const existStudentList = await StudentList.findOne({ teacherEmail, listName: listName.trim() });
          if (existStudentList) return { ok: false, error: "같은 이름의 리스트가 존재합니다." };
        }
        // 바꿀 이름이 없다면 수정
        await StudentList.updateOne({ _id: listId }, { listName, listOrder, listIcon });
        // listIcon 값이 delete이면 null로 저장
        if (listIcon === "delete") await StudentList.updateOne({ _id: listId }, { listIcon: null });
        return { ok: true };
      },
    ),

    changeStudentListOrder: protectedMutation(async (_, { teacherEmail, preOrder, postOrder }) => {
      const studentList = await StudentList.find({ teacherEmail }).sort({ listOrder: 1 });
      const studentListId = studentList.map((e) => e._id);
      const studentListOrder = studentList.map((e) => e.listOrder);

      if (preOrder !== postOrder) {
        // 순서를 더 뒤로 바꿀 때
        if (preOrder < postOrder) {
          studentListOrder.splice(preOrder - 1, 0, studentListOrder[postOrder - 1]);
          studentListOrder.splice(postOrder, 1);
        }
        // 순서를 더 앞으로 바꿀 때
        else if (preOrder > postOrder) {
          studentListOrder.splice(preOrder, 0, studentListOrder[postOrder - 1]);
          studentListOrder.splice(postOrder - 1, 1);
        }
        // 바꾼 순서대로 DB에 적용
        for (let i = 0; i < studentList.length; i++) {
          await StudentList.updateOne({ _id: studentListId[i] }, { listOrder: studentListOrder[i] });
        }
      }
      return { ok: true };
    }),

    deleteStudentList: protectedMutation(async (_, { teacherEmail, listId }) => {
      await StudentList.deleteOne({ _id: listId });
      await Student.updateMany({ $pull: { listId } });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
