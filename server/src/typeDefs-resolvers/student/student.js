const Student = require("../../models/Student");
const StudentList = require("../../models/StudentList");
const Journal = require("../../models/Journal");
const { protectedQuery, protectedMutation } = require("../../utils/_utils");

const resolver = {
  Student: {
    journal: async ({ _id }) => {
      const journal = await Journal.find({ ownerId: _id.toString() });
      return journal;
    },
    journalNum: async ({ _id }) => {
      return Journal.count({ ownerId: _id });
    },
  },

  Query: {
    seeAllStudent: protectedQuery(async (_, { studentId, allergy, tag, sort, trash }, { loggedInUser }) => {
      let sortValue;
      sort === "name"
        ? // sort 값이 "name"일 경우 studentName으로 정렬
          (sortValue = { studentName: 1 })
        : sort === "num"
        ? // sort 값이 "num"일 경우 studentNumber로 정렬
          (sortValue = { studentNumber: 1 })
        : // sort 값이 없거나 "name" 이나 "num" 값이 아닐 경우 id(생성일)순으로 보기
          (sortValue = { _id: 1 });

      // tag 값이 있으면 tag가 있는 학생들 보기
      if (tag)
        return await Student.find({ teacherEmail: loggedInUser.email, tag: { $all: tag }, trash: false })
          .sort(sortValue)
          .collation({ locale: "ko", numericOrdering: true });

      // allergy 값이 있으면 allergy 모든 학생 보기
      if (allergy)
        return await Student.find({ teacherEmail: loggedInUser.email, allergy })
          .sort(sortValue)
          .collation({ locale: "ko", numericOrdering: true });

      // trash 값이 true이면 휴지통에 있는 학생 보기
      if (trash) return await Student.find({ teacherEmail: loggedInUser.email, trash: true });

      // studentId 값만 있으면 한 학생 보기
      if (studentId) return await Student.find({ _id: studentId, teacherEmail: loggedInUser.email });
      // 아무 값도 없으면 모든 학생 보기
      else
        return await Student.find({ teacherEmail: loggedInUser.email, trash: false })
          .sort(sortValue)
          .collation({ locale: "ko", numericOrdering: true });
    }),
  },

  Mutation: {
    createStudent: protectedMutation(async (_, { teacherEmail, studentString }) => {
      const studentArr = JSON.parse(studentString);
      const existStudent = [];

      for (let i = 0; i < studentArr.length; i++) {
        if (studentArr[i].name.trim() === "") continue;
        const student = await Student.findOne({ teacherEmail, studentName: studentArr[i].name });
        if (!student)
          await Student.create({
            teacherEmail,
            studentName: studentArr[i].name,
            studentGender: studentArr[i].gender,
            tag: [studentArr[i].gender === "male" ? "남학생" : "여학생"],
          });
        else existStudent.push(student.studentName);
      }

      return {
        ok: true,
        ...(existStudent.length !== 0 && { error: `${existStudent.join(", ")}의 이름이 중복됩니다. 😅` }),
      };
    }),

    addStudent: protectedMutation(async (_, { teacherEmail, studentId, listId }) => {
      // studentId 는 Array 타입
      let checkExist;

      for (const id of studentId) {
        // 학생이 중복되는지 검사
        const studentList = await StudentList.findOne({ _id: listId, studentId: id });
        if (studentList) {
          checkExist = true;
          continue;
        }

        // 리스트에 학생id 추가
        await StudentList.updateOne({ _id: listId }, { $addToSet: { studentId: id } });

        // 학생에 리스트id 추가
        await Student.updateOne({ _id: id }, { $addToSet: { listId } });
      }

      if (checkExist) return { ok: true, error: "일부 학생이 이미 리스트에 존재합니다." };
      else return { ok: true };
    }),

    editStudent: protectedMutation(
      async (
        _,
        {
          teacherEmail,
          studentId,
          studentName,
          studentNumber,
          studentGender,
          parentPhoneNum,
          allergy,
          tag,
          delTag,
          trash,
          icon,
          memo,
          restoreAll,
          studentIcon,
          role,
        },
      ) => {
        // 바꿀 이름이 이미 있는지 검사
        if (studentName) {
          const existStudent = await Student.findOne({ teacherEmail, studentName: studentName.trim() });
          if (existStudent) return { ok: false, error: "같은 이름의 학생이 존재합니다. 😅" };
        }
        // 번호에 숫자 이외의 문자가 있는지 검사
        if (studentNumber) {
          if (studentNumber === "delNum") {
            await Student.updateOne({ _id: studentId }, { studentNumber: null });
          } else {
            const regex = /^[0-9]*$/g;
            if (!regex.test(studentNumber))
              return { ok: false, error: "학생 번호에 숫자 이외의 문자가 입력되었습니다." };
            await Student.updateOne({ _id: studentId }, { studentNumber });
            await Student.updateOne(
              { _id: studentId },
              { $addToSet: { tag: parseInt(studentNumber) % 2 === 0 ? "짝수" : "홀수" } },
            );
            await Student.updateOne(
              { _id: studentId },
              { $pull: { tag: parseInt(studentNumber) % 2 === 0 ? "홀수" : "짝수" } },
            );
          }
        }
        // 성별 수정
        if (studentGender) {
          await Student.updateOne({ _id: studentId }, { studentGender });
          await Student.updateOne(
            { _id: studentId },
            { $addToSet: { tag: studentGender === "male" ? "남학생" : "여학생" } },
          );
          await Student.updateOne(
            { _id: studentId },
            { $pull: { tag: studentGender === "male" ? "여학생" : "남학생" } },
          );
        }
        // 학생 정보 수정(이름, 부모번호, 태그, 메모, 아이콘)
        await Student.updateOne(
          { _id: studentId },
          {
            studentName,
            parentPhoneNum,
            $addToSet: { tag },
            $pull: { tag: delTag },
            memo,
            icon,
            role,
          },
        );
        // 알러지 값이 있을 경우
        if (allergy) {
          await Student.updateOne({ _id: studentId }, { allergy });
          const student = await Student.find({ teacherEmail });
          const totalAllergyInfo = [];
          student.forEach((e) => totalAllergyInfo.push.apply(totalAllergyInfo, e.allergy));
          const allergyInfo = [...new Set(totalAllergyInfo)];
          allergyInfo.sort((a, b) => a - b);
          await User.updateOne({ email: teacherEmail }, { allergy: allergyInfo });
        }
        // 휴지통 보내기
        if (trash !== null) await Student.updateOne({ _id: studentId }, { trash });
        // 휴지통 전체 복구
        if (restoreAll) await Student.updateMany({ teacherEmail }, { trash: false });
        // listIcon 값이 delete이면 null로 저장
        if (studentIcon === "delete") await Student.updateOne({ _id: studentId }, { icon: null });
        return { ok: true };
      },
    ),

    deleteStudent: protectedMutation(async (_, { disconnectOnly, teacherEmail, studentId, listId }) => {
      // 연결해제일 경우 listId 도 받아야함.
      if (disconnectOnly) {
        await Student.updateOne({ _id: studentId }, { $pull: { listId } });
        await StudentList.updateOne({ _id: listId }, { $pull: { studentId } });
      }
      // 아예 삭제
      else {
        await Attendance.deleteMany({ studentId });
        await Journal.deleteMany({ ownerId: studentId });
        await Student.deleteOne({ _id: studentId });
        await StudentList.updateMany({ $pull: { studentId } });
      }
      return { ok: true };
    }),

    deleteAllStudent: protectedMutation(async (_, { teacherEmail }) => {
      // 휴지통에 있는 학생을 찾아서 id 값만 배열로 만들기
      const students = await Student.find({ teacherEmail, trash: true });
      const ids = students.map((x) => x._id);

      // 학생 리스트 전체를 뒤져서 휴지통에 있는 학생 id를 삭제하기
      await StudentList.updateMany({ teacherEmail }, { $pull: { studentId: { $in: ids } } });

      // 마지막으로 휴지통에 있는 학생 다 지우기
      for (let i = 0; i < ids.length; i++) {
        await Attendance.deleteMany({ studentId: ids[i] });
        await Journal.deleteMany({ ownerId: ids[i] });
      }
      await Student.deleteMany({ teacherEmail, trash: true });
      return { ok: true };
    }),
  },
};

module.exports = resolver;
