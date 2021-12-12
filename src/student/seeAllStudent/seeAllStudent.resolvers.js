import Student from "../../models/student";
import { protectedResovler } from "../../user/user.utils";

export default {
  Query: {
    seeAllStudent: protectedResovler(async (_, __, { loggedInUser }) => {
      return await Student.find({ teacherEmail: loggedInUser.email }).sort({ "_id": 1 })
    })
  }
}