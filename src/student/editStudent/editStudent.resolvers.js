import Student from "../../models/student";
import User from "../../models/user";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudent: protectedMutationResovler(
      async (_, { teacherEmail, studentId, studentName, studentNumber, studentGender, parentPhoneNum, allergy, tag, delTag, trash, icon, memo, restoreAll, studentIcon, role }, { loggedInUser }) => {
        //
        // 바꿀 이름이 이미 있는지 검사
        if (studentName) {
          const existStudent = await Student.findOne({ teacherEmail, studentName: studentName.trim() });
          if (existStudent) return { ok: false, error: "같은 이름의 학생이 존재합니다. 😅" };
        }
        //
        // 번호에 숫자 이외의 문자가 있는지 검사
        if (studentNumber) {
          if (studentNumber === "delNum") {
            await Student.updateOne({ _id: studentId }, { studentNumber: null });
          } else {
            const regex = /^[0-9]*$/g;
            if (!regex.test(studentNumber)) return { ok: false, error: "학생 번호에 숫자 이외의 문자가 입력되었습니다." };
            await Student.updateOne({ _id: studentId }, { studentNumber });
            await Student.updateOne({ _id: studentId }, { $addToSet: { tag: parseInt(studentNumber) % 2 === 0 ? "짝수" : "홀수" } });
            await Student.updateOne({ _id: studentId }, { $pull: { tag: parseInt(studentNumber) % 2 === 0 ? "홀수" : "짝수" } });
          }
        }
        //
        // 성별 수정
        if (studentGender) {
          await Student.updateOne({ _id: studentId }, { studentGender });
          await Student.updateOne({ _id: studentId }, { $addToSet: { tag: studentGender === "male" ? "남학생" : "여학생" } });
          await Student.updateOne({ _id: studentId }, { $pull: { tag: studentGender === "male" ? "여학생" : "남학생" } });
        }
        //
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
          }
        );
        //
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
        //
        // 휴지통 보내기
        if (trash !== null) await Student.updateOne({ _id: studentId }, { trash });
        //
        // 휴지통 전체 복구
        if (restoreAll) await Student.updateMany({ teacherEmail }, { trash: false });
        //
        // listIcon 값이 delete이면 null로 저장
        if (studentIcon === "delete") await Student.updateOne({ _id: studentId }, { icon: null });
        return { ok: true };
      }
    ),
  },
};
