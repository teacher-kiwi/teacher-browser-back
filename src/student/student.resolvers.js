import Journal from "../models/journal";

export default {
  Student: {
    journal: async ({ _id }) => {
      const journal = await Journal.findOne({ ownerId: _id.toString() });
      if (journal) return journal.contents;
      else {
        await Journal.updateOne({ ownerId: _id.toString() }, { contents: [] });
        return [];
      }
    },
  },
};
