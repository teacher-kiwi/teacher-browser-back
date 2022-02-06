const midnightToday = new Date().setHours(24, 0, 0, 0)
const midnightYesterDay = new Date().setHours(0, 0, 0, 0)

export default {
  ToDoList: {
    ingToDo: ({ startDate, endDate, isComplete }) => {
      if (!startDate) {
        if (isComplete) {
          return false
        } else {
          return true
        }
      }
      if (startDate) {
        if (new Date(startDate.setHours(0, 0, 0, 0)) > midnightYesterDay) {
          return false
        } else if (new Date(endDate).setHours(24, 0, 0, 0) < midnightToday) {
          return false
        } else {
          return true
        }
      }
    },
    notToDo: ({ startDate, endDate, isComplete }) => {
      if (!startDate) {
        return false
      }
      if (isComplete) {
        return false
      } else {
        if (new Date(endDate).setHours(24, 0, 0, 0) < midnightToday) {
          return true
        } else {
          return false
        }
      }
    },
    inComingToDo: ({ startDate, isComplete }) => {
      if (!startDate) {
        return false
      }
      if (isComplete) {
        return false
      } else {
        if (new Date(startDate).setHours(24, 0, 0, 0) > midnightToday) {
          return true
        } else {
          return false
        }
      }
    },
  }
}