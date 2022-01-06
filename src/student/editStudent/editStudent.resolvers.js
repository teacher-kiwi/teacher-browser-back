import Student from "../../models/student";
import User from "../../models/user";
import { protectedMutationResovler } from "../../user/user.utils";

export default {
  Mutation: {
    editStudent: protectedMutationResovler(
      async (_, { teacherEmail, studentId, studentName, studentGender, parentPhoneNum, allergy, tag, delTag }, { loggedInUser }) => {
        //
        // 바꿀 이름이 이미 있는지 검사
        const existStudent = await Student.findOne({ teacherEmail, studentName });
        if (existStudent) return { ok: false, error: "같은 이름의 학생이 존재합니다." };
        //
        // 바꿀 이름이 없다면 수정
        await Student.updateOne({ _id: studentId }, { studentName, studentGender, parentPhoneNum, $addToSet: { tag }, $pull: { tag: delTag } });
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
