import PageLink from "../../models/pageLink"

export default {
  Query: {
    seePageLink: async (_, { folder }) => {
      if (folder) {
        return await PageLink.find({ folder }).sort({ updateAt: -1 })
      }
      return await PageLink.find().sort({ updateAt: -1 })
    }
  }
}