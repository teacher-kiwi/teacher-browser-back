import Journal from "../../models/journal";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeJournal: protectedQueryResovler(async (_, {  date, studentId, journalId }, {loggedInUser}) => {
      if (date) {
        return await Journal.find({ teacherEmail: loggedInUser.email, date }).sort({ _id: 1 })
      }
      if (journalId) {
        return await Journal.find({ teacherEmail: loggedInUser.email, _id: journalId })
      }
      if (studentId) {
        return await Journal.find({ teacherEmail: loggedInUser.email, ownerId: studentId }).sort({ date: 1 })
      }
    })
  }
}