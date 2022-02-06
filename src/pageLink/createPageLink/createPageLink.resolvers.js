import PageLink from "../../models/pageLink";

export default {
  Mutation: {
    createPageLink: async (_, { pageTitle, pageDescription, pageURL, folder, type }) => {
      const pageLink = await PageLink.findOne({ pageTitle })
      if (pageLink) {
        return {
          ok: false,
          error: "같은 이름의 추천 페이지 존재"
        }
      }
      await PageLink.create({
        pageTitle,
        pageDescription,
        pageURL,
        folder,
        type,
        updateAt: new Date()
      })
      return {
        ok: true
      }
    }
  }
}