import Student from "../models/student";

export default {
  StudentList: {
    students: async ({ listId }, { sort }) => {
      let sortValue;
      sort === "name"
        ? // sort 값이 "name"일 경우 studentName으로 정렬
        (sortValue = { studentName: 1 })
        : sort === "num"
          ? // sort 값이 "num"일 경우 studentNumber로 정렬
          (sortValue = { studentNumber: 1 })
          : // sort 값이 없거나 "name" 이나 "num" 값이 아닐 경우 id(생성일)순으로 보기
          (sortValue = { _id: 1 });

      return await Student.find({ listId: listId.toString() }).sort(sortValue).collation({ locale: "ko", numericOrdering: true });
    },
  },
};
