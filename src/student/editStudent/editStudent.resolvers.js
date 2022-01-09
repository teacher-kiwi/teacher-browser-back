import Student from "../../models/student";
import User from "../../models/user";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudent: protectedMutationResovler(
      async (_, { teacherEmail, studentId, studentName, studentNumber, studentGender, parentPhoneNum, allergy, tag, delTag }, { loggedInUser }) => {
        //
        // 바꿀 이름이 이미 있는지 검사
        const existStudent = await Student.findOne({ teacherEmail, studentName: studentName.trim() });
        if (existStudent) return { ok: false, error: "같은 이름의 학생이 존재합니다." };
        //
        // 번호에 숫자 이외의 문자가 있는지 검사
        if (studentNumber) {
          const regex = /^[0-9]*$/g;
          if (!regex.test(studentNumber)) return { ok: false, error: "학생 번호에 숫자 이외의 문자가 입력되었습니다." };
        }
        //
        // 바꿀 이름이 없다면 수정(이름, 번호, 성별, 부모번호, 태그)
        await Student.updateOne(
          { _id: studentId },
          { studentName: studentName.trim(), studentNumber, studentGender, parentPhoneNum, $addToSet: { tag }, $pull: { tag: delTag } }
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

        return { ok: true };
      }
    ),
  },
};
