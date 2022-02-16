import Journal from "../../models/journal";
import { protectedQueryResovler } from "../../user/user.utils";

export default {
  Query: {
    seeJournal: protectedQueryResovler(async (_, { teacherEmail, date, studentId, journalId }) => {
      if (date) {
        return await Journal.find({ teacherEmail, date }).sort({ _id: 1 })
      }
      if (journalId) {
        return await Journal.find({ teacherEmail, _id: journalId })
      }
      if (studentId) {
        return await Journal.find({ teacherEmail, ownerId: studentId }).sort({ date: 1 })
      }
    })
  }
}