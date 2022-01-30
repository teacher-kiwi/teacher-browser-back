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
        const curDate = new Date()
        if (new Date(startDate) > curDate) {
          return false
        } else if (new Date(endDate) < curDate) {
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
        const curDate = new Date()
        if (new Date(endDate) < curDate) {
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
        const curDate = new Date()
        if (new Date(startDate) > curDate) {
          return true
        } else {
          return false
        }
      }
    },
  }
}