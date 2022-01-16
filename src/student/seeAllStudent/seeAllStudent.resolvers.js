import Student from "../../models/student";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeAllStudent: protectedQueryResovler(async (_, { studentId, allergy, tag, sort, trash }, { loggedInUser }) => {
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
      if (allergy) return await Student.find({ teacherEmail: loggedInUser.email, allergy }).sort(sortValue).collation({ locale: "ko", numericOrdering: true });

      // trash 값이 true이면 휴지통에 있는 학생 보기
      if (trash) return await Student.find({ teacherEmail: loggedInUser.email, trash: true });

      // studentId 값만 있으면 한 학생 보기
      if (studentId) return await Student.find({ _id: studentId, teacherEmail: loggedInUser.email });
      // 아무 값도 없으면 모든 학생 보기
      else return await Student.find({ teacherEmail: loggedInUser.email, trash: false }).sort(sortValue).collation({ locale: "ko", numericOrdering: true });
    }),
  },
};
