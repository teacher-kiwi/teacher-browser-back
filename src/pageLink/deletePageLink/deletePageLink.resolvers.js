import PageLink from "../../models/pageLink";

export default {
  Mutation: {
    deletePageLink: async (_, { pageTitle }) => {
      await PageLink.deleteOne({ pageTitle });
      return {
        ok: true,
      };
    },
  },
};
