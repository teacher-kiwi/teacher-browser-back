import Schedule from "../models/schedule";

export default {
  Schedule: {
    isSort: async ({ allDate, sort, userEmail }) => {
      let enableSortArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      for (let i = 0; i < allDate.length; i++) {
        const includesSchedule = await Schedule.find({
          userEmail,
          allDate: allDate[i]
        })
        includesSchedule.forEach(item => {
          enableSortArr = enableSortArr.filter(sort => sort !== item.sort)
        })
      }
      const enableSort = Math.min(...enableSortArr)
      if (enableSort < sort) {
        return enableSort
      } else {
        return null
      }
    }
  }
}