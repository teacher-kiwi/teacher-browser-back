import { gql } from "apollo-server-core";

export default gql`
  input Students {
    # 학생을 생성하면서 리스트에 추가할 경우 요청값에 다음 값을 포함
    studentName: String
    studentOrder: Int

    # 기존에 있던 학생을 리스트에 추가할 경우 요청값에 다음 값을 포함
    studentId: String
  }

  type Mutation {
    createStudentList(
      teacherEmail: String!
      listName: String!
      listOrder: Int!

      # 리스트를 생성하면서 동시에 학생을 등록하려면 요청값에 다음 값을 포함
      students: [Students]
    ): mutationResult
  }
`;
