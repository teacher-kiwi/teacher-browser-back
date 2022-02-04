import PageLink from "../../models/pageLink"

export default {
  Query: {
    seePageLink: async (_, { folder, pageTitle }) => {
      if (pageTitle) {
        return await PageLink.find({ pageTitle })
      }
      if (folder) {
        return await PageLink.find({ folder }).sort({ updateAt: -1 })
      }
      return await PageLink.find().sort({ updateAt: -1 })
    }
  }
}