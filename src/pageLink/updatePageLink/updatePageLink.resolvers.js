import PageLink from "../../models/pageLink"

export default {
  Mutation: {
    updatePageLink: async (_, { pageTitle, pageDescription, folder }) => {
      await PageLink.updateOne({ pageTitle }, { pageDescription, folder })
      return {
        ok: true
      }
    }
  }
}